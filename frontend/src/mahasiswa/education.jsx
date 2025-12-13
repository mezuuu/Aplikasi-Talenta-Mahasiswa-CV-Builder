import { useCV } from './CVContext';

export default function EducationForm() {
    const { state, updateEducation, removeEducation } = useCV();
    const { education } = state;

    const handleChange = (id, field, value) => {
        updateEducation(id, { [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-sky-500">Please enter</span> your education information
                </h1>
                <p className="text-gray-500 mt-1">
                    Write your schools or courses you finished.
                </p>
            </div>

            {/* Dashed separator */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Education Items */}
            {education.map((edu, index) => (
                <div key={edu.id} className="space-y-4 relative">
                    {/* Remove Button */}
                    <button
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition-colors"
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

                    <div className="text-sm text-gray-500">
                        {edu.degree || '(Not specified)'}, {edu.school || 'Unknown'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* School */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                School
                            </label>
                            <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                                placeholder="University Name"
                            />
                        </div>

                        {/* Degree */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Degree
                            </label>
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                                placeholder="Bachelor of Science"
                            />
                        </div>

                        {/* Graduation Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Graduation date
                            </label>
                            <input
                                type="text"
                                value={edu.graduationDate}
                                onChange={(e) => handleChange(edu.id, 'graduationDate', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                                placeholder="May 2024"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                value={edu.city}
                                onChange={(e) => handleChange(edu.id, 'city', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                                placeholder="Surakarta"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={edu.description}
                            onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all resize-none"
                            placeholder="Describe your achievements, relevant coursework, GPA, etc."
                        />
                    </div>

                    {/* Separator between items */}
                    {index < education.length - 1 && (
                        <div className="border-t border-dashed border-gray-300 pt-4" />
                    )}
                </div>
            ))}
        </div>
    );
}
