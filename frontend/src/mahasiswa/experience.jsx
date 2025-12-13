import { useCV } from './CVContext';

export default function ExperienceForm() {
    const { state, addExperience, updateExperience, removeExperience, nextStep, prevStep } = useCV();
    const { experience } = state;

    const handleChange = (id, field, value) => {
        updateExperience(id, { [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-sky-500">Tell us</span> about your experience
                </h1>
                <p className="text-gray-500 mt-1">
                    Write your jobs (recent ones) with sort points of your did.
                </p>
            </div>

            {/* Dashed separator */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Add Button */}
            <button
                onClick={addExperience}
                className="flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                    />
                </svg>
                Add Employment
            </button>

            {/* Experience Items */}
            {experience.map((exp, index) => (
                <div key={exp.id} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                    {/* Remove Button */}
                    <button
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <div className="text-sm font-medium text-gray-500">Experience {index + 1}</div>
                </div>
            ))}
        </div>
    );
}
