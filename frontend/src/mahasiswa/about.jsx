import { useCV } from './CVContext';

export default function AboutForm() {
    const { state, updateAbout, nextStep, prevStep } = useCV();
    const { about } = state;

    const handleChange = (e) => {
        updateAbout({ summary: e.target.value });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-sky-500">Write down</span> your professional summary
                </h1>
                <p className="text-gray-500 mt-1">
                    Write 2-4 short lines about your work, wins, and skills
                </p>
            </div>

            {/* Summary Textarea */}
            <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                    Summary
                </label>
                <textarea
                    id="summary"
                    value={about.summary}
                    onChange={handleChange}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all resize-none"
                    placeholder="A results-driven software engineer with 5+ years of experience in full-stack development. Proven track record of delivering high-quality web applications using React and Node.js. Strong problem-solving skills and excellent team collaboration abilities."
                />
            </div>

            {/* Character count hint */}
            <p className="text-sm text-gray-400">
                Tip: Keep your summary concise and impactful. Focus on your key strengths and what makes you unique.
            </p>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <button
                    onClick={prevStep}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back
                </button>

                <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
                >
                    Next to Finish
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
