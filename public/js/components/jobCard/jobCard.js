export function jobCard(job) {
    const posted = new Date(job.postedDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return `
    <div class="job-card bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-amber-400 hover:-translate-y-2 hover:shadow-2xl transition duration-500" data-job-id="${job.id}">

        <div class="p-6 md:p-8">

            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                <div class="flex-1">

                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                            ${job.department}
                        </span>
                        <span class="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            ${job.type}
                        </span>
                    </div>

                    <h3 class="text-2xl font-bold text-slate-900">
                        ${job.title}
                    </h3>

                    <div class="flex flex-wrap items-center gap-4 mt-3 text-slate-500 text-sm">
                        <span><i class="fa-solid fa-location-dot text-amber-500 mr-1"></i> ${job.location}</span>
                        <span><i class="fa-solid fa-briefcase text-amber-500 mr-1"></i> ${job.experience}</span>
                        <span><i class="fa-solid fa-calendar text-amber-500 mr-1"></i> Posted ${posted}</span>
                    </div>

                    <p class="mt-4 text-slate-600 leading-relaxed">
                        ${job.summary}
                    </p>

                </div>

                <div class="flex flex-row md:flex-col gap-3 shrink-0">
                    <button
                        class="applyBtn px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full transition duration-300 cursor-pointer"
                        data-id="${job.id}"
                    >
                        Apply Now
                    </button>
                    <button
                        class="toggleDetailsBtn px-6 py-3 border border-slate-300 hover:border-amber-400 text-slate-700 font-semibold rounded-full transition duration-300 cursor-pointer"
                        data-id="${job.id}"
                    >
                        View Details
                    </button>
                </div>

            </div>

            <div class="job-details hidden mt-6 pt-6 border-t border-slate-200" id="job-details-${job.id}">

                <h4 class="text-lg font-bold text-slate-900 mb-3">About the Role</h4>
                <p class="text-slate-600 leading-relaxed mb-6">${job.description}</p>

                <h4 class="text-lg font-bold text-slate-900 mb-3">Requirements</h4>
                <ul class="list-disc list-inside text-slate-600 space-y-2">
                    ${job.requirements.map(req => `<li>${req}</li>`).join("")}
                </ul>

                <button
                    class="applyBtn mt-6 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full transition duration-300 cursor-pointer"
                    data-id="${job.id}"
                >
                    Apply for this Position
                </button>

            </div>

        </div>

    </div>
    `;
}
