import { useRef } from 'react';
import { CVProvider, useCV } from './CVContext';
import ContactForm from './contact';
import ExperienceForm from './experience';
import EducationForm from './education';
import SkillForm from './skill';
import AboutForm from './about';
import FinishForm from './finish';

// Step components mapping
const STEP_COMPONENTS = [
    ContactForm,
    ExperienceForm,
    EducationForm,
    SkillForm,
    AboutForm,
    FinishForm,
];

function CVBuilderContent() {
    const { state } = useCV();
    const { currentStep } = state;
    const previewRef = useRef(null);

    // Get current step component
    const CurrentStepComponent = STEP_COMPONENTS[currentStep] || ContactForm;

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex flex-col lg:flex-row">
                {/* Left Side - Form Area */}
                <div className="w-full lg:w-[55%] min-h-screen p-6 lg:p-10 overflow-y-auto relative pb-24">
                    {/* Step Indicator */}
                    <div className="max-w-xl">
                        <StepIndicator />
                    </div>

                    {/* Form Content */}
                    <div className="max-w-xl mt-6">
                        <CurrentStepComponent previewRef={previewRef} />
                    </div>

                    {/* Logout Button - Fixed at bottom left */}
                    <div className="fixed bottom-6 left-6 z-50">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg shadow-lg transition-all duration-200 font-medium"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Right Side - Preview Area */}
                <div className="hidden lg:block w-[45%] bg-gray-200 min-h-screen p-8 overflow-y-auto">
                    <Preview ref={previewRef} />
                </div>
            </div>
        </div>
    );
}
