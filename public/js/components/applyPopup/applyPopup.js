import { submitJobApplication } from "../../utils/api.js";

let popup;
let popupContent;
let jobIdInput;
let jobTitleInput;

export function initApplyPopup() {
    if (!document.querySelector("#applyPopup")) {
        const popupContainer = document.createElement("div");
        popupContainer.innerHTML = `
            <div id="applyPopup" class="fixed inset-0 z-[9999] hidden items-center justify-center p-4">
                <div id="applyOverlay" class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                <div id="applyPopupContent"
                    class="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl scale-95 opacity-0 transition-all duration-300">

                    <div class="relative bg-amber-500 px-8 py-8 text-white">
                        <button id="closeApplyPopup" class="absolute top-5 right-5 text-3xl leading-none hover:rotate-90 duration-300">
                            &times;
                        </button>
                        <p class="uppercase tracking-[4px] text-sm opacity-90">Careers</p>
                        <h2 class="text-3xl font-bold mt-2">Apply for Position</h2>
                        <p class="mt-3 text-white/90">Submit your details and we'll get back to you within 2-3 business days.</p>
                    </div>

                    <form id="applyForm" class="p-8 space-y-5">
                        <input type="hidden" id="applyJobId" name="jobId">
                        <input type="hidden" id="applyJobTitle" name="jobTitle">

                        <div>
                            <label class="font-semibold block mb-2">Position</label>
                            <input type="text" id="applyPositionDisplay" readonly
                                class="w-full border rounded-xl px-4 py-3 bg-gray-100 font-semibold text-slate-800">
                        </div>

                        <div>
                            <label class="font-semibold block mb-2">Full Name</label>
                            <input type="text" id="applyName" name="name" placeholder="Enter your full name"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-amber-500" required>
                        </div>

                        <div>
                            <label class="font-semibold block mb-2">Email Address</label>
                            <input type="email" id="applyEmail" name="email" placeholder="Enter your email"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-amber-500" required>
                        </div>

                        <div>
                            <label class="font-semibold block mb-2">Mobile Number</label>
                            <input type="tel" id="applyPhone" name="phone" placeholder="Enter your mobile number"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-amber-500" required>
                        </div>

                        <div>
                            <label class="font-semibold block mb-2">Years of Experience</label>
                            <select id="applyExperience" name="experience"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-white" required>
                                <option value="">Select Experience</option>
                                <option value="Fresher">Fresher</option>
                                <option value="Less than 1 year">Less than 1 year</option>
                                <option value="1-2 years">1-2 years</option>
                                <option value="2-4 years">2-4 years</option>
                                <option value="4-6 years">4-6 years</option>
                                <option value="6+ years">6+ years</option>
                            </select>
                        </div>

                        <div>
                            <label class="font-semibold block mb-2">LinkedIn / Portfolio URL <span class="text-slate-400 font-normal">(optional)</span></label>
                            <input type="url" id="applyLinkedIn" name="linkedin" placeholder="https://linkedin.com/in/yourprofile"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-amber-500">
                        </div>

                        <div>
                            <label class="font-semibold block mb-2">Cover Message</label>
                            <textarea id="applyMessage" name="message" rows="3" placeholder="Tell us why you're a great fit..."
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-amber-500 resize-none" required></textarea>
                        </div>

                        <div>
                            <label class="font-semibold block mb-2">Resume (PDF)</label>
                            <input type="file" id="applyResume" name="resume" accept="application/pdf"
                                class="w-full border rounded-xl px-4 py-3 outline-none focus:border-amber-500 bg-white" required>
                        </div>

                        <button type="submit"
                            class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-xl font-semibold duration-300 cursor-pointer">
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(popupContainer.firstElementChild);

        if (!document.querySelector("#applyPopupStyles")) {
            const style = document.createElement("style");
            style.id = "applyPopupStyles";
            style.textContent = `
                #applyPopupContent {
                    max-height: calc(100vh - 40px);
                    overflow-y: auto;
                }
                #applyPopupContent::-webkit-scrollbar { width: 6px; }
                #applyPopupContent::-webkit-scrollbar-track { background: #f3f4f6; }
                #applyPopupContent::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 100px; }
                #applyForm input:focus, #applyForm select:focus, #applyForm textarea:focus {
                    box-shadow: 0 0 0 4px rgba(245, 158, 11, .15);
                }
            `;
            document.head.appendChild(style);
        }
    }

    popup = document.querySelector("#applyPopup");
    popupContent = document.querySelector("#applyPopupContent");
    jobIdInput = document.querySelector("#applyJobId");
    jobTitleInput = document.querySelector("#applyJobTitle");

    document.querySelector("#closeApplyPopup")?.addEventListener("click", closeApplyPopup);
    document.querySelector("#applyOverlay")?.addEventListener("click", closeApplyPopup);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeApplyPopup();
    });

    const form = document.querySelector("#applyForm");

    if (form) {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const submitBtn = form.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
            submitBtn.classList.add("opacity-50", "cursor-not-allowed");

            const applicationData = new FormData();
            applicationData.append("jobId", jobIdInput.value);
            applicationData.append("jobTitle", jobTitleInput.value);
            applicationData.append("name", form.querySelector("#applyName").value.trim());
            applicationData.append("email", form.querySelector("#applyEmail").value.trim());
            applicationData.append("phone", form.querySelector("#applyPhone").value.trim());
            applicationData.append("experience", form.querySelector("#applyExperience").value);
            applicationData.append("linkedin", form.querySelector("#applyLinkedIn").value.trim());
            applicationData.append("message", form.querySelector("#applyMessage").value.trim());
            applicationData.append("source", "Careers Apply");

            const resumeInput = form.querySelector("#applyResume");
            if (resumeInput.files.length > 0) {
                applicationData.append("resume", resumeInput.files[0]);
            }

            const applicationName = form.querySelector("#applyName").value.trim();
            const applicationJobTitle = jobTitleInput.value;
            const applicationPhone = form.querySelector("#applyPhone").value.trim();

            try {

                const result = await submitJobApplication(applicationData);

                if (!result.success) {

                    alert(result.message);

                    return;

                }

                const header = popupContent.querySelector(".relative.bg-amber-500");

                form.classList.add("hidden");

                if (header) {

                    header.classList.add("hidden");

                }

                popupContent.querySelector(".apply-success")?.remove();

                const successContainer = document.createElement("div");

                successContainer.className =
                    "apply-success p-10 flex flex-col items-center text-center justify-center space-y-6";

                successContainer.innerHTML = `

                <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-lg shadow-emerald-500/20">

                    <svg class="w-10 h-10 text-emerald-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">

                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>

                    </svg>

                </div>

                <h3 class="text-3xl font-bold text-slate-900">

                    Application Submitted!

                </h3>

                <p class="text-slate-600 leading-relaxed max-w-sm">

                    Thank you,

                    <span class="font-semibold text-slate-800">

                        ${applicationName}

                    </span>.

                    <br><br>

                    We've received your application for

                    <span class="font-semibold text-slate-800">

                        ${applicationJobTitle}

                    </span>

                    and will contact you shortly on

                    <span class="font-semibold text-slate-800">

                        ${applicationPhone}

                    </span>.

                </p>

                <div class="w-12 h-1 bg-amber-500 rounded-full"></div>

            `;

                popupContent.appendChild(successContainer);

                setTimeout(() => {

                    closeApplyPopup();

                    setTimeout(() => {

                        successContainer.remove();

                        form.reset();

                        form.classList.remove("hidden");

                        if (header) {

                            header.classList.remove("hidden");

                        }

                    }, 400);

                }, 3500);

            }

            catch (error) {

                console.error("Application Error:", error);

                alert("Something went wrong. Please try again.");

            }

            finally {

                if (submitBtn) {

                    submitBtn.disabled = false;

                    submitBtn.textContent = originalBtnText;

                    submitBtn.classList.remove("opacity-50", "cursor-not-allowed");

                }

            }

        });

    }
}

export function openApplyPopup(job) {
    jobIdInput.value = job.id;
    jobTitleInput.value = job.title;
    document.querySelector("#applyPositionDisplay").value = job.title;

    popup.classList.remove("hidden");
    popup.classList.add("flex");

    requestAnimationFrame(() => {
        popupContent.classList.remove("scale-95", "opacity-0");
        popupContent.classList.add("scale-100", "opacity-100");
    });
}

export function closeApplyPopup() {
    popupContent.classList.remove("scale-100", "opacity-100");
    popupContent.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
        popup.classList.remove("flex");
        popup.classList.add("hidden");
    }, 300);
}
