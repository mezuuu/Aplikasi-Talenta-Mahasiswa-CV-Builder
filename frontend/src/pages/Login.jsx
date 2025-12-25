import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1: Login and get tokens
      const res = await api.post("/auth/jwt/create/", formData);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

<<<<<<< HEAD
      // Fetch user info to check role
      const userRes = await api.get("/api/users/me/");
      const user = userRes.data;

      // Redirect based on role
      if (user.is_staff || user.is_superuser) {
        navigate("/admin/dashboard");
      } else {
        navigate("/mahasiswa");
=======
      // Step 2: Get user info to check role
      const userRes = await api.get("/api/users/me/");
      const userInfo = userRes.data;
      localStorage.setItem("user_info", JSON.stringify(userInfo));

      // Step 3: Redirect based on role
      if (userInfo.is_staff || userInfo.is_superuser) {
        // Admin goes to admin dashboard
        navigate("/admin-dashboard");
      } else {
        // Mahasiswa goes to CV Builder (contact page first)
        navigate("/cv-builder");
>>>>>>> ed137fdf8ac58e2f8406a1928aa11bd0af1376da
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login Gagal! Cek username/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className="w-full border p-2 mb-4 rounded"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "Masuk"}
        </button>
        <div className="text-center text-sm mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar disini
          </Link>
        </div>
      </form>
    </div>
  );
}
