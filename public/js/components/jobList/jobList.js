import { jobCard } from "../jobCard/jobCard.js";

let currentJobs = [];

export function renderJobs(jobs, filter = {}) {
    const container = document.getElementById("jobContainer");
    if (!container) return;

    let filtered = jobs.filter(job => job.isActive);

    if (filter.department && filter.department !== "all") {
        filtered = filtered.filter(job => job.department === filter.department);
    }

    if (filter.type && filter.type !== "all") {
        filtered = filtered.filter(job => job.type === filter.type);
    }

    currentJobs = filtered;

    if (!filtered.length) {
        container.innerHTML = `
            <div class="text-center py-20">
                <div class="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-6">
                    <i class="fa-solid fa-briefcase text-3xl text-slate-400"></i>
                </div>
                <h2 class="text-3xl font-bold text-slate-900">No Open Positions</h2>
                <p class="mt-4 text-slate-500 max-w-md mx-auto">
                    We don't have any openings matching your criteria right now. Check back soon or send your resume to careers@ssprimeinfra.com
                </p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(jobCard).join("");
}

export function initJobFilters(jobs) {
    const departmentFilter = document.getElementById("departmentFilter");
    const typeFilter = document.getElementById("typeFilter");

    if (!departmentFilter && !typeFilter) return;

    const departments = [...new Set(jobs.map(j => j.department))].sort();
    const types = [...new Set(jobs.map(j => j.type))].sort();

    if (departmentFilter) {
        departments.forEach(dept => {
            const option = document.createElement("option");
            option.value = dept;
            option.textContent = dept;
            departmentFilter.appendChild(option);
        });

        departmentFilter.addEventListener("change", () => {
            renderJobs(jobs, {
                department: departmentFilter.value,
                type: typeFilter ? typeFilter.value : "all"
            });
        });
    }

    if (typeFilter) {
        types.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        });

        typeFilter.addEventListener("change", () => {
            renderJobs(jobs, {
                department: departmentFilter ? departmentFilter.value : "all",
                type: typeFilter.value
            });
        });
    }
}

export function initJobInteractions(openApplyPopup) {
    document.addEventListener("click", (e) => {
        const applyBtn = e.target.closest(".applyBtn");
        if (applyBtn) {
            const job = currentJobs.find(j => j.id == applyBtn.dataset.id);
            if (job) openApplyPopup(job);
            return;
        }

        const toggleBtn = e.target.closest(".toggleDetailsBtn");
        if (toggleBtn) {
            const details = document.getElementById(`job-details-${toggleBtn.dataset.id}`);
            if (!details) return;

            const isHidden = details.classList.contains("hidden");
            details.classList.toggle("hidden");

            toggleBtn.textContent = isHidden ? "Hide Details" : "View Details";
        }
    });
}
