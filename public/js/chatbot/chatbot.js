
document.body.insertAdjacentHTML("beforeend", `
    <button id="chatbot-toggle" type="button" class="fixed bottom-6 right-6 z-[9999] flex  md:min-h-[72px] md:w-[250px] items-center gap-2.5  rounded-3xl md:rounded-full border-0 bg-[#065b47] p-2 md:px-3 md:py-2 text-left text-white shadow-xl transition duration-150 hover:scale-105 hover:bg-[#047158] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" aria-label="Ask AI about properties" aria-controls="chatbot-container" aria-expanded="false">
        <span class="flex size-[30px] md:size-[50px] shrink-0 items-center justify-center rounded-full bg-[#e6b52e] text-[#073f33]" aria-hidden="true">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3 10.2 9.2 4 11l6.2 1.8L12 19l1.8-6.2L20 11l-6.2-1.8L12 3Z"/>
                <path d="m19 14-.9 2.1L16 17l2.1.9L19 20l.9-2.1L22 17l-2.1-.9L19 14Z"/>
                <path d="M5 3v3M3.5 4.5h3"/>
            </svg>
        </span>
        <span class="flex min-w-0 flex-col gap-1">
            <span class="text-[13px] font-bold leading-tight">Ask AI</span>
            <span class="whitespace-nowrap text-[11px] leading-tight text-[#b7eadb] hidden md:block">Find your dream property</span>
        </span>
    </button>

    <section id="chatbot-container" class="fixed bottom-24 right-6 z-[9998] hidden h-[520px] w-[370px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 max-sm:inset-x-3 max-sm:bottom-20 max-sm:h-[70vh] max-sm:w-auto" aria-label="SS Prime Assistant" aria-hidden="true">
        <header class="flex shrink-0 items-center justify-between bg-emerald-950 px-5 py-4 text-white">
            <div>
                <h2 class="m-0 text-base font-semibold">SS Prime Assistant</h2>
                <p class="mt-1 text-xs text-emerald-200">Your real estate companion</p>
            </div>
            <button id="chatbot-close" type="button" class="cursor-pointer border-0 bg-transparent text-xl leading-none text-white transition hover:text-emerald-200" aria-label="Close chatbot">&times;</button>
        </header>

        <div id="chatbot-messages" class="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-y-contain p-4" aria-live="polite">
            <div class="max-w-[85%] rounded-xl rounded-tl-sm bg-gray-200 px-4 py-3 text-sm text-gray-800 ml-2">
                Hello! Welcome to SS Prime Infra. How can I help you find your dream property?
            </div>
        </div>

        <form id="chatbot-form" class="flex shrink-0 gap-2 border-t border-gray-200 bg-white p-3">
            <input id="chatbot-input" type="text" class="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800" placeholder="Ask about properties..." autocomplete="off" aria-label="Message" />
            <button class="rounded-lg bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-65" type="submit">Send</button>
        </form>
    </section>
`);

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotClose = document.getElementById("chatbot-close");

const chatbotInput = document.getElementById("chatbot-input");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotMessages = document.getElementById("chatbot-messages");

const API_URL = "/api/chatbot/message";

// ----------------------------------
// 1. Open / Close Chatbot
// ----------------------------------

chatbotToggle.addEventListener("click", () => {
    chatbotContainer.classList.remove("hidden");
    chatbotContainer.classList.add("flex");
    chatbotContainer.setAttribute("aria-hidden", "false");
    chatbotToggle.setAttribute("aria-expanded", "true");
    chatbotInput.focus();
});

chatbotClose.addEventListener("click", () => {
    chatbotContainer.classList.add("hidden");
    chatbotContainer.classList.remove("flex");
    chatbotContainer.setAttribute("aria-hidden", "true");
    chatbotToggle.setAttribute("aria-expanded", "false");
    chatbotToggle.focus();
});

// ----------------------------------
// 2. Scroll Chat to Bottom
// ----------------------------------

const scrollToBottom = () => {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

// ----------------------------------
// 3. Create Message Bubble
// ----------------------------------

const addMessage = (message, sender) => {
    const messageElement = document.createElement("div");

    messageElement.className =
        sender === "user"
            ? "ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-emerald-900 px-4 py-3 text-sm leading-6 text-white"
            : "mr-auto max-w-[95%] rounded-xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-6 ml-2 text-gray-800 shadow-sm border border-gray-100";

    // User messages are always plain text
    messageElement.textContent = message;

    chatbotMessages.appendChild(messageElement);
    scrollToBottom();

    return messageElement;
};

// ----------------------------------
// 4. Safe HTML Escape
// ----------------------------------

const escapeHTML = (value) => {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };

        return entities[char];
    });
};

// ----------------------------------
// 5. Render AI Markdown Response
// ----------------------------------

const formatAIResponse = (message) => {
    let formatted = escapeHTML(message);

    // Remove escaped markdown characters
    formatted = formatted.replace(/\\([*_])/g, "$1");

    // Bold text
    formatted = formatted.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-emerald-950">$1</strong>'
    );

    // Italic text
    formatted = formatted.replace(
        /\*(.*?)\*/g,
        "<em>$1</em>"
    );

    // Bullet points
    formatted = formatted.replace(
        /^\s*[-*]\s+(.*)$/gm,
        '<div class="my-1 flex gap-2"><span class="text-emerald-800">•</span><span>$1</span></div>'
    );

    // Line breaks
    formatted = formatted.replace(/\n/g, "<br>");

    return formatted;
};

// ----------------------------------
// 6. Render Bot Response
// ----------------------------------

const addBotMessage = (message) => {
    const messageElement = document.createElement("div");

    messageElement.className =
        "mr-auto max-w-[95%] rounded-xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-6 text-gray-800 shadow-sm border border-gray-100";

    messageElement.innerHTML = formatAIResponse(message);

    chatbotMessages.appendChild(messageElement);
    scrollToBottom();

    return messageElement;
};

// ----------------------------------
// 7. Render Property Cards
// ----------------------------------

const addPropertyCards = (properties = []) => {
    if (!Array.isArray(properties) || properties.length === 0) {
        return;
    }

    const wrapper = document.createElement("div");

    wrapper.className = "mr-auto w-full max-w-[95%] space-y-3";

    properties.forEach((property) => {
        const card = document.createElement("div");

        card.className =
            "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm";

        // Property image
        const image = document.createElement("img");

        const validImage = property.images?.find(
            (src) =>
                typeof src === "string" &&
                src.startsWith("img/") &&
                !src.includes("..")
        );

        image.src = validImage ? `/${validImage}` : "";
        image.alt = property.title || "Property image";
        image.className = "h-36 w-full bg-gray-100 object-cover";
        image.loading = "lazy";

        if (!validImage) {
            image.classList.add("hidden");
        }

        image.onerror = () => {
            image.classList.add("hidden");
        };

        // Property details
        const details = document.createElement("div");

        details.className = "space-y-3 p-3";

        const title = document.createElement("h4");
        title.className = "text-base font-semibold text-emerald-950";
        title.textContent = property.title || "Property";

        const builder = document.createElement("p");
        builder.className = "text-xs text-gray-500";
        builder.textContent = property.builder || "Builder not available";

        const price = document.createElement("p");
        price.className = "text-lg font-bold text-emerald-800";
        price.textContent = property.priceLabel || "Price on Request";

        const features = document.createElement("div");

        features.className =
            "grid grid-cols-2 gap-3 border-t border-gray-100 pt-3";

        const addFeature = (label, value) => {
            if (!value) return;

            const item = document.createElement("div");

            const featureLabel = document.createElement("p");
            featureLabel.className = "text-[11px] text-gray-400";
            featureLabel.textContent = label;

            const featureValue = document.createElement("p");
            featureValue.className = "text-xs font-medium text-gray-800";
            featureValue.textContent = value;

            item.append(featureLabel, featureValue);
            features.appendChild(item);
        };

        addFeature("Configuration", property.bhk);
        addFeature("Property Type", property.type);
        addFeature("Location", property.city);
        addFeature("Carpet Area", property.carpetArea);
        addFeature("Status", property.status);

        details.append(
            title,
            builder,
            price,
            features
        );

        card.append(image, details);
        wrapper.appendChild(card);
    });

    chatbotMessages.appendChild(wrapper);
    scrollToBottom();
};

// ----------------------------------
// 8. Loading Indicator
// ----------------------------------

const showLoading = () => {
    const loading = document.createElement("div");

    loading.className =
        "mr-auto rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-600";

    loading.textContent = "Thinking...";

    chatbotMessages.appendChild(loading);
    scrollToBottom();

    return loading;
};

// ----------------------------------
// 9. Send Message to Backend
// ----------------------------------

chatbotForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = chatbotInput.value.trim();

    if (!message) return;

    // Show user message
    addMessage(message, "user");

    chatbotInput.value = "";
    chatbotInput.disabled = true;

    const submitButton = chatbotForm.querySelector(
        'button[type="submit"]'
    );

    if (submitButton) {
        submitButton.disabled = true;
    }

    const loadingMessage = showLoading();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();

        loadingMessage.remove();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Unable to process your request."
            );
        }

        // Show formatted AI response
        addBotMessage(data.reply || "No response generated.");

        // Show actual property cards
        addPropertyCards(data.properties);

    } catch (error) {
        loadingMessage.remove();

        addBotMessage(
            "Sorry, something went wrong. Please try again."
        );

        console.error("Chatbot Error:", error);

    } finally {
        chatbotInput.disabled = false;

        if (submitButton) {
            submitButton.disabled = false;
        }

        chatbotInput.focus();
    }
});
