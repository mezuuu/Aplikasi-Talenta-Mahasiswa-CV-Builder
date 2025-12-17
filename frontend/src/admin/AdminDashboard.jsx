import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "./sidebar";
import { FiChevronRight } from "react-icons/fi";

export default function AdminDashboard() {
    const [expanded, setExpanded] = useState(true);
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if user is admin
                const userRes = await api.get("/api/users/me/");
                if (!userRes.data.is_staff && !userRes.data.is_superuser) {
                    navigate("/dashboard");
                    return;
                }
                setUser(userRes.data);

                // Fetch all students
                const studentsRes = await api.get("/api/students/");
                setStudents(studentsRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const toggleStudentActive = async (studentId, e) => {
        e.stopPropagation();
        setTogglingId(studentId);
        try {
            const res = await api.post(`/api/students/${studentId}/toggle_active/`);
            setStudents(students.map(s =>
                s.id === studentId ? { ...s, is_active: res.data.is_active } : s
            ));
        } catch (error) {
            console.error("Error toggling student status", error);
        } finally {
            setTogglingId(null);
        }
    };

    const handleCardClick = (student) => {
        setSelectedStudent(selectedStudent?.id === student.id ? null : student);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar expanded={expanded} setExpanded={setExpanded} />

            {/* Main Content */}
            <main
                className={`
                    transition-all duration-300 ease-in-out
                    ${expanded ? "ml-72" : "ml-20"}
                    flex-1 bg-gray-100 p-8
                `}
            >
                {/* Header */}
                <div className="max-w-4xl mx-auto mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-600">Selamat datang, {user?.username}</p>
                </div>

                {/* Student Cards */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {students.map((student) => (
                        <div
                            key={student.id}
                            onClick={() => handleCardClick(student)}
                            className={`
                                bg-white rounded-2xl px-6 py-4 flex items-center gap-4 cursor-pointer
                                transition-all duration-200 hover:shadow-lg border-2
                                ${student.is_active === false ? 'border-red-300 opacity-60' : 'border-transparent'}
                                ${selectedStudent?.id === student.id ? 'ring-2 ring-blue-500' : ''}
                            `}
                        >
                            {/* Avatar */}
                            {student.photo ? (
                                <img
                                    src={student.photo}
                                    alt={student.full_name}
                                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-[#2596be] flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-xl">
                                        {student.full_name?.charAt(0)?.toUpperCase() || 'M'}
                                    </span>
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 truncate">
                                    {student.full_name || 'Mahasiswa'}
                                </h3>
                                <p className="text-gray-500 text-sm truncate">
                                    {student.bio || student.prodi || 'Deskripsi singkat'}
                                </p>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                onClick={(e) => toggleStudentActive(student.id, e)}
                                disabled={togglingId === student.id}
                                className={`
                                    relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0
                                    ${student.is_active !== false ? 'bg-green-500' : 'bg-gray-400'}
                                    ${togglingId === student.id ? 'opacity-50' : ''}
                                `}
                                title={student.is_active !== false ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                            >
                                <span
                                    className={`
                                        absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow
                                        ${student.is_active !== false ? 'left-7' : 'left-1'}
                                    `}
                                />
                            </button>

                            {/* Chevron */}
                            <FiChevronRight className="text-gray-400 text-2xl flex-shrink-0" />
                        </div>
                    ))}

                    {students.length === 0 && (
                        <div className="bg-white rounded-2xl p-8 text-center text-gray-500">
                            Belum ada data mahasiswa
                        </div>
                    )}
                </div>

                {/* Student Detail Panel */}
                {selectedStudent && (
                    <div className="max-w-4xl mx-auto mt-6 bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-start gap-6">
                            {selectedStudent.photo ? (
                                <img
                                    src={selectedStudent.photo}
                                    alt={selectedStudent.full_name}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-[#2596be] flex items-center justify-center">
                                    <span className="text-white font-bold text-3xl">
                                        {selectedStudent.full_name?.charAt(0)?.toUpperCase() || 'M'}
                                    </span>
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedStudent.full_name}
                                    </h2>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedStudent.is_active !== false
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {selectedStudent.is_active !== false ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-1">NIM: {selectedStudent.nim}</p>
                                <p className="text-gray-600 mb-1">Prodi: {selectedStudent.prodi}</p>
                                <p className="text-gray-600 mb-3">{selectedStudent.bio}</p>

                                {selectedStudent.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedStudent.skills.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
