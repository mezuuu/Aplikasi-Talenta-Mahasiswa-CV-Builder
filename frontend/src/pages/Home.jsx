import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api
      .get("/api/students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">Talenta UMS</h1>
        <Link
          to="/login"
          className="bg-white text-blue-900 px-4 py-1 rounded font-semibold"
        >
          Login
        </Link>
      </nav>

      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Daftar Talenta
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-40 bg-gray-300 flex items-center justify-center">
                {student.photo ? (
                  <img
                    src={student.photo}
                    alt={student.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No Photo</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{student.full_name}</h3>
                <p className="text-blue-600 text-sm">{student.prodi}</p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {student.bio || "Belum ada bio."}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {student.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
