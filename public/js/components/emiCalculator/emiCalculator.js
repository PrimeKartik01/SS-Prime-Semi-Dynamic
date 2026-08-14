/**
 * emiCalculator.js
 * ------------------------------------------------------------------
 * Standalone, reusable Home Loan EMI Calculator component.
 * Vanilla JS, no build step, no external dependencies.
 *
 * Public API
 * ------------------------------------------------------------------
 *   import { initEMICalculator, openEMICalculator } from "./components/emiCalculator/emiCalculator.js";
 *
 *   const calc = initEMICalculator({ container: "#emi-calculator", propertyPrice: 5000000 });
 *   calc.open(42000000);       // update + reveal from a property card
 *   calc.update({ propertyPrice: 42000000 });
 *   calc.destroy();
 *
 *   // or, if you only have a container reference and not the instance:
 *   openEMICalculator("#emi-calculator", property.priceRaw);
 * ------------------------------------------------------------------
 */

/* ============================================================
   1. PURE CALCULATION LOGIC (no DOM, easy to unit test)
   ============================================================ */

/** Loan amount = property price - down payment amount. Never negative. */
export function calculateLoanAmount(propertyPrice, downPaymentAmount) {
  const loan = Number(propertyPrice) - Number(downPaymentAmount);
  return loan > 0 ? loan : 0;
}

/**
 * Standard reducing-balance EMI formula:
 *   EMI = P * R * (1+R)^N / ((1+R)^N - 1)
 * Falls back to a simple division when the interest rate is 0.
 */
export function calculateEMI(principal, annualRatePercent, tenureYears) {
  const P = Number(principal);
  const N = Math.round(Number(tenureYears) * 12);

  if (!P || P <= 0 || !N || N <= 0) return 0;

  const annualRate = Number(annualRatePercent) || 0;
  if (annualRate <= 0) return P / N;

  const R = annualRate / 12 / 100;
  const pow = Math.pow(1 + R, N);
  const emi = (P * R * pow) / (pow - 1);
  return Number.isFinite(emi) ? emi : 0;
}

export function calculateTotalPayment(emi, tenureYears) {
  const N = Math.round(Number(tenureYears) * 12);
  return emi * N;
}

export function calculateTotalInterest(emi, tenureYears, principal) {
  const total = calculateTotalPayment(emi, tenureYears);
  const interest = total - Number(principal);
  return interest > 0 ? interest : 0;
}

/* ============================================================
   2. FORMATTING HELPERS (Indian numbering system)
   ============================================================ */

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/** ₹40,00,000 style formatting. */
export function formatCurrency(amount) {
  const value = Math.round(Number(amount) || 0);
  return "\u20B9" + inrFormatter.format(Math.abs(value));
}

/** Compact Lakh / Crore label, e.g. "₹4.20 Cr" or "₹8.50 L", for large headline numbers. */
export function formatCurrencyCompact(amount) {
  const value = Number(amount) || 0;
  const abs = Math.abs(value);
  if (abs >= 1_00_00_000) return "\u20B9" + (value / 1_00_00_000).toFixed(2) + " Cr";
  if (abs >= 1_00_000) return "\u20B9" + (value / 1_00_000).toFixed(2) + " L";
  return formatCurrency(value);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/* ============================================================
   3. DEFAULT CONFIG
   ============================================================ */

const DEFAULTS = {
  container: null,
  propertyPrice: 50_00_000,
  defaultDownPayment: 20, // percent
  defaultInterestRate: 8.5,
  defaultTenure: 20,
  minInterestRate: 5,
  maxInterestRate: 15,
  minTenure: 1,
  maxTenure: 30,
  minPropertyPrice: 1_00_000,
  onLoanAssistance: null,
};

let instanceCounter = 0;
const registry = new Map(); // container element -> instance, powers openEMICalculator()

/* ============================================================
   4. MARKUP (rendered once per instance, namespaced by uid)
   ============================================================ */

function renderMarkup(root, uid) {
  root.innerHTML = `
  <section class="emi-calc" aria-labelledby="emi-title-${uid}">
    <header class="emi-calc__header">
      <p class="emi-calc__eyebrow">Home Loan</p>
      <h2 class="emi-calc__title" id="emi-title-${uid}">EMI Calculator</h2>
      <p class="emi-calc__subtitle">Estimate your monthly instalment before you enquire.</p>
    </header>

    <div class="emi-calc__body">
      <!-- INPUTS -->
      <form class="emi-calc__inputs" novalidate>
        <div class="emi-field">
          <div class="emi-field__row">
            <label for="propertyPrice-${uid}">Property Price</label>
          </div>
          <div class="emi-field__input-wrap">
            <span class="emi-field__prefix" aria-hidden="true">\u20B9</span>
            <input
              type="text"
              inputmode="numeric"
              id="propertyPrice-${uid}"
              class="emi-field__text"
              aria-describedby="propertyPrice-hint-${uid} propertyPrice-error-${uid}"
            />
          </div>
          <p class="emi-field__hint" id="propertyPrice-hint-${uid}"></p>
          <p class="emi-field__error" id="propertyPrice-error-${uid}" role="alert"></p>
        </div>

        <div class="emi-field">
          <div class="emi-field__row">
            <label for="downPayment-${uid}">Down Payment</label>
            <div class="emi-toggle" role="group" aria-label="Down payment unit">
              <button type="button" class="emi-toggle__btn is-active" data-mode="percent" id="dpModePercent-${uid}" aria-pressed="true">%</button>
              <button type="button" class="emi-toggle__btn" data-mode="amount" id="dpModeAmount-${uid}" aria-pressed="false">\u20B9</button>
            </div>
          </div>
          <div class="emi-field__input-wrap">
            <span class="emi-field__prefix emi-field__prefix--dp" aria-hidden="true">%</span>
            <input
              type="text"
              inputmode="numeric"
              id="downPayment-${uid}"
              class="emi-field__text"
              aria-describedby="downPayment-hint-${uid} downPayment-error-${uid}"
            />
          </div>
          <p class="emi-field__hint" id="downPayment-hint-${uid}"></p>
          <p class="emi-field__error" id="downPayment-error-${uid}" role="alert"></p>
        </div>

        <div class="emi-field emi-field--readout">
          <span class="emi-field__label-static">Loan Amount</span>
          <span class="emi-field__value" id="loanAmount-${uid}">\u20B90</span>
        </div>

        <div class="emi-field">
          <div class="emi-field__row">
            <label for="interestRate-${uid}">Interest Rate</label>
            <span class="emi-field__badge"><span id="interestRateValue-${uid}">0</span>%</span>
          </div>
          <input
            type="range"
            id="interestRate-${uid}"
            class="emi-slider"
            step="0.1"
          />
          <p class="emi-field__error" id="interestRate-error-${uid}" role="alert"></p>
        </div>

        <div class="emi-field">
          <div class="emi-field__row">
            <label for="tenure-${uid}">Loan Tenure</label>
            <span class="emi-field__badge"><span id="tenureValue-${uid}">0</span> Yrs</span>
          </div>
          <input
            type="range"
            id="tenure-${uid}"
            class="emi-slider"
            step="1"
          />
          <p class="emi-field__error" id="tenure-error-${uid}" role="alert"></p>
        </div>
      </form>

      <!-- RESULTS -->
      <div class="emi-calc__results">
        <div class="emi-result-card">
          <span class="emi-corner emi-corner--tl" aria-hidden="true"></span>
          <span class="emi-corner emi-corner--tr" aria-hidden="true"></span>
          <span class="emi-corner emi-corner--bl" aria-hidden="true"></span>
          <span class="emi-corner emi-corner--br" aria-hidden="true"></span>

          <p class="emi-result-card__label">Estimated Monthly EMI</p>
          <p class="emi-result-card__value" id="emiValue-${uid}" aria-live="polite">\u20B90</p>
          <p class="emi-result-card__per-month">per month</p>

          <div class="emi-ledger" role="table" aria-label="Loan breakdown">
            <div class="emi-ledger__row" role="row">
              <span class="emi-ledger__dot emi-ledger__dot--principal" aria-hidden="true"></span>
              <span class="emi-ledger__label" role="cell">Principal Amount</span>
              <span class="emi-ledger__leader" aria-hidden="true"></span>
              <span class="emi-ledger__value" id="principalValue-${uid}" role="cell">\u20B90</span>
            </div>
            <div class="emi-ledger__row" role="row">
              <span class="emi-ledger__dot emi-ledger__dot--interest" aria-hidden="true"></span>
              <span class="emi-ledger__label" role="cell">Total Interest</span>
              <span class="emi-ledger__leader" aria-hidden="true"></span>
              <span class="emi-ledger__value" id="interestValue-${uid}" role="cell">\u20B90</span>
            </div>
            <div class="emi-ledger__row emi-ledger__row--total" role="row">
              <span class="emi-ledger__dot" aria-hidden="true"></span>
              <span class="emi-ledger__label" role="cell">Total Payment</span>
              <span class="emi-ledger__leader" aria-hidden="true"></span>
              <span class="emi-ledger__value" id="totalValue-${uid}" role="cell">\u20B90</span>
            </div>
          </div>

          <div class="emi-chart" aria-hidden="true">
            <svg viewBox="0 0 120 120" class="emi-chart__svg">
              <circle cx="60" cy="60" r="50" class="emi-chart__track"></circle>
              <circle cx="60" cy="60" r="50" class="emi-chart__seg emi-chart__seg--principal" id="chartPrincipal-${uid}"></circle>
              <circle cx="60" cy="60" r="50" class="emi-chart__seg emi-chart__seg--interest" id="chartInterest-${uid}"></circle>
            </svg>
            <div class="emi-chart__center">
              <span class="emi-chart__center-label">Principal</span>
              <span class="emi-chart__center-value" id="chartPercent-${uid}">0%</span>
            </div>
          </div>
        </div>

        <div class="emi-cta">
          <p class="emi-cta__title">Need Help With Your Home Loan?</p>
          <p class="emi-cta__body">Talk to our property advisor and get assistance with home loan options and financing.</p>
          <button type="button" class="emi-cta__btn" id="loanAssistanceBtn-${uid}">Get Loan Assistance</button>
        </div>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   5. INSTANCE (state + DOM wiring)
   ============================================================ */

function createInstance(options) {
  const opts = { ...DEFAULTS, ...options };

  const root =
    typeof opts.container === "string"
      ? document.querySelector(opts.container)
      : opts.container;

  if (!root) {
    console.error("[emiCalculator] container not found:", opts.container);
    return null;
  }

  const uid = `emi${++instanceCounter}`;
  renderMarkup(root, uid);

  const el = (id) => root.querySelector(`#${id}-${uid}`);

  const dom = {
    propertyPrice: el("propertyPrice"),
    propertyPriceHint: el("propertyPrice-hint"),
    propertyPriceError: el("propertyPrice-error"),
    downPayment: el("downPayment"),
    downPaymentPrefix: root.querySelector(".emi-field__prefix--dp"),
    downPaymentHint: el("downPayment-hint"),
    downPaymentError: el("downPayment-error"),
    dpModePercent: el("dpModePercent"),
    dpModeAmount: el("dpModeAmount"),
    loanAmount: el("loanAmount"),
    interestRate: el("interestRate"),
    interestRateValue: el("interestRateValue"),
    interestRateError: el("interestRate-error"),
    tenure: el("tenure"),
    tenureValue: el("tenureValue"),
    tenureError: el("tenure-error"),
    emiValue: el("emiValue"),
    principalValue: el("principalValue"),
    interestValue: el("interestValue"),
    totalValue: el("totalValue"),
    chartPrincipal: el("chartPrincipal"),
    chartInterest: el("chartInterest"),
    chartPercent: el("chartPercent"),
    ctaBtn: el("loanAssistanceBtn"),
  };

  // Internal state (no globals — lives entirely in this closure)
  const state = {
    propertyPrice: Math.max(opts.propertyPrice || DEFAULTS.propertyPrice, 0),
    downPaymentMode: "percent", // "percent" | "amount"
    downPaymentPercent: opts.defaultDownPayment,
    downPaymentAmount: 0,
    interestRate: opts.defaultInterestRate,
    tenure: opts.defaultTenure,
  };

  function computeDownPaymentAmount() {
    return state.downPaymentMode === "percent"
      ? (state.propertyPrice * state.downPaymentPercent) / 100
      : state.downPaymentAmount;
  }

  function computeDownPaymentPercent() {
    if (state.propertyPrice <= 0) return 0;
    return state.downPaymentMode === "percent"
      ? state.downPaymentPercent
      : (state.downPaymentAmount / state.propertyPrice) * 100;
  }

  /* -------------------- validation -------------------- */

  function validate() {
    const errors = {};
    const dpAmount = computeDownPaymentAmount();

    if (!state.propertyPrice || state.propertyPrice <= 0) {
      errors.propertyPrice = "Enter a property price greater than \u20B90.";
    }

    if (dpAmount < 0) {
      errors.downPayment = "Down payment can't be negative.";
    } else if (dpAmount >= state.propertyPrice) {
      errors.downPayment = "Down payment can't be greater than or equal to the property price.";
    }

    if (state.interestRate < opts.minInterestRate || state.interestRate > opts.maxInterestRate) {
      errors.interestRate = `Interest rate should be between ${opts.minInterestRate}% and ${opts.maxInterestRate}%.`;
    }

    if (state.tenure < opts.minTenure || state.tenure > opts.maxTenure) {
      errors.tenure = `Tenure should be between ${opts.minTenure} and ${opts.maxTenure} years.`;
    }

    const loanAmount = calculateLoanAmount(state.propertyPrice, dpAmount);
    if (loanAmount === 0) {
      errors.downPayment = errors.downPayment || "Loan amount is \u20B90 — reduce the down payment.";
    }

    return errors;
  }

  function showErrors(errors) {
    dom.propertyPriceError.textContent = errors.propertyPrice || "";
    dom.downPaymentError.textContent = errors.downPayment || "";
    dom.interestRateError.textContent = errors.interestRate || "";
    dom.tenureError.textContent = errors.tenure || "";

    dom.propertyPrice.setAttribute("aria-invalid", String(!!errors.propertyPrice));
    dom.downPayment.setAttribute("aria-invalid", String(!!errors.downPayment));
  }

  /* -------------------- rendering -------------------- */

  function updateChart(principal, interest) {
    const total = principal + interest;
    const circumference = 2 * Math.PI * 50;
    const principalRatio = total > 0 ? principal / total : 0;
    const interestRatio = total > 0 ? interest / total : 0;

    dom.chartPrincipal.style.strokeDasharray = `${circumference}`;
    dom.chartPrincipal.style.strokeDashoffset = `${circumference * (1 - principalRatio)}`;

    dom.chartInterest.style.strokeDasharray = `${circumference}`;
    dom.chartInterest.style.strokeDashoffset = `${circumference * (1 - interestRatio)}`;
    dom.chartInterest.style.transform = `rotate(${principalRatio * 360}deg)`;

    dom.chartPercent.textContent = `${Math.round(principalRatio * 100)}%`;
  }

  function updateResults() {
    const errors = validate();
    showErrors(errors);

    const dpAmount = clamp(computeDownPaymentAmount(), 0, state.propertyPrice || 0);
    const loanAmount = calculateLoanAmount(state.propertyPrice, dpAmount);
    const rate = clamp(state.interestRate, opts.minInterestRate, opts.maxInterestRate);
    const tenure = clamp(state.tenure, opts.minTenure, opts.maxTenure);

    const emi = calculateEMI(loanAmount, rate, tenure);
    const totalPayment = calculateTotalPayment(emi, tenure);
    const totalInterest = calculateTotalInterest(emi, tenure, loanAmount);

    dom.loanAmount.textContent = formatCurrency(loanAmount);
    dom.emiValue.textContent = loanAmount > 0 ? formatCurrency(emi) : "\u2014";
    dom.principalValue.textContent = formatCurrency(loanAmount);
    dom.interestValue.textContent = formatCurrency(totalInterest);
    dom.totalValue.textContent = formatCurrency(totalPayment);

    dom.propertyPriceHint.textContent =
      state.propertyPrice >= 1_00_000 ? `\u2248 ${formatCurrencyCompact(state.propertyPrice)}` : "";
    dom.downPaymentHint.textContent =
      state.downPaymentMode === "percent"
        ? `\u2248 ${formatCurrency(dpAmount)}`
        : `\u2248 ${computeDownPaymentPercent().toFixed(1)}%`;

    updateChart(loanAmount, totalInterest);

    return { propertyPrice: state.propertyPrice, downPaymentAmount: dpAmount, loanAmount, interestRate: rate, tenure, emi, totalInterest, totalPayment };
  }

  function syncInputsFromState() {
    dom.propertyPrice.value = inrFormatter.format(state.propertyPrice);
    dom.downPayment.value =
      state.downPaymentMode === "percent"
        ? Number(state.downPaymentPercent.toFixed(2))
        : inrFormatter.format(Math.round(state.downPaymentAmount));

    dom.interestRate.min = opts.minInterestRate;
    dom.interestRate.max = opts.maxInterestRate;
    dom.interestRate.value = state.interestRate;
    dom.interestRateValue.textContent = state.interestRate.toFixed(1);

    dom.tenure.min = opts.minTenure;
    dom.tenure.max = opts.maxTenure;
    dom.tenure.value = state.tenure;
    dom.tenureValue.textContent = state.tenure;
  }

  /* -------------------- input parsing -------------------- */

  function parseNumeric(rawValue) {
    const cleaned = String(rawValue).replace(/[^\d.]/g, "");
    const value = parseFloat(cleaned);
    return Number.isFinite(value) ? value : 0;
  }

  /* -------------------- event wiring -------------------- */

  dom.propertyPrice.addEventListener("input", (e) => {
    state.propertyPrice = parseNumeric(e.target.value);
    updateResults();
  });
  dom.propertyPrice.addEventListener("blur", () => {
    dom.propertyPrice.value = inrFormatter.format(state.propertyPrice);
  });

  dom.downPayment.addEventListener("input", (e) => {
    const value = parseNumeric(e.target.value);
    if (state.downPaymentMode === "percent") {
      state.downPaymentPercent = value;
    } else {
      state.downPaymentAmount = value;
    }
    updateResults();
  });
  dom.downPayment.addEventListener("blur", () => {
    dom.downPayment.value =
      state.downPaymentMode === "percent"
        ? Number(state.downPaymentPercent.toFixed(2))
        : inrFormatter.format(Math.round(state.downPaymentAmount));
  });

  function setDownPaymentMode(mode) {
    if (mode === state.downPaymentMode) return;
    if (mode === "amount") {
      state.downPaymentAmount = computeDownPaymentAmount();
    } else {
      state.downPaymentPercent = computeDownPaymentPercent();
    }
    state.downPaymentMode = mode;

    dom.dpModePercent.classList.toggle("is-active", mode === "percent");
    dom.dpModePercent.setAttribute("aria-pressed", String(mode === "percent"));
    dom.dpModeAmount.classList.toggle("is-active", mode === "amount");
    dom.dpModeAmount.setAttribute("aria-pressed", String(mode === "amount"));
    dom.downPaymentPrefix.textContent = mode === "percent" ? "%" : "\u20B9";

    syncInputsFromState();
    updateResults();
  }

  dom.dpModePercent.addEventListener("click", () => setDownPaymentMode("percent"));
  dom.dpModeAmount.addEventListener("click", () => setDownPaymentMode("amount"));

  dom.interestRate.addEventListener("input", (e) => {
    state.interestRate = parseFloat(e.target.value);
    dom.interestRateValue.textContent = state.interestRate.toFixed(1);
    updateResults();
  });

  dom.tenure.addEventListener("input", (e) => {
    state.tenure = parseInt(e.target.value, 10);
    dom.tenureValue.textContent = state.tenure;
    updateResults();
  });

  dom.ctaBtn.addEventListener("click", () => {
    const snapshot = updateResults();
    if (typeof opts.onLoanAssistance === "function") {
      opts.onLoanAssistance(snapshot);
    }
  });

  /* -------------------- public instance API -------------------- */

  syncInputsFromState();
  updateResults();

  const instance = {
    root,
    uid,
    update(next = {}) {
      if (next.propertyPrice != null) state.propertyPrice = Math.max(Number(next.propertyPrice) || 0, 0);
      if (next.downPaymentPercent != null) {
        state.downPaymentMode = "percent";
        state.downPaymentPercent = Number(next.downPaymentPercent) || 0;
      }
      if (next.interestRate != null) state.interestRate = Number(next.interestRate) || opts.defaultInterestRate;
      if (next.tenure != null) state.tenure = Number(next.tenure) || opts.defaultTenure;
      syncInputsFromState();
      return updateResults();
    },
    open(propertyPrice) {
      if (propertyPrice != null) {
        state.propertyPrice = Math.max(Number(propertyPrice) || 0, 0);
        syncInputsFromState();
        updateResults();
      }
      root.scrollIntoView({ behavior: "smooth", block: "start" });
      root.querySelector(`#propertyPrice-${uid}`)?.focus();
    },
    getSnapshot: updateResults,
    destroy() {
      registry.delete(root);
      root.innerHTML = "";
    },
  };

  registry.set(root, instance);
  return instance;
}

/* ============================================================
   6. PUBLIC EXPORTS
   ============================================================ */

export function initEMICalculator(options = {}) {
  return createInstance(options);
}

export function openEMICalculator(container, propertyPrice) {
  const root = typeof container === "string" ? document.querySelector(container) : container;
  const instance = root ? registry.get(root) : null;
  if (!instance) {
    console.warn("[emiCalculator] openEMICalculator: no calculator initialised for", container);
    return null;
  }
  instance.open(propertyPrice);
  return instance;
}
