import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TalentDetail from "./pages/TalentDetail";
<<<<<<< HEAD
import AdminDashboard from "./admin/AdminDashboard";
import CVBuilder from "./mahasiswa/CVBuilder";
=======
import CVBuilder from "./mahasiswa/CVBuilder";
import AdminDashboard from "./admin/AdminDashboard";
>>>>>>> ed137fdf8ac58e2f8406a1928aa11bd0af1376da

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/talent/:id" element={<TalentDetail />} />
<<<<<<< HEAD
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/mahasiswa" element={<CVBuilder />} />
=======
        <Route path="/cv-builder" element={<CVBuilder />} />
>>>>>>> ed137fdf8ac58e2f8406a1928aa11bd0af1376da
      </Routes>
    </BrowserRouter>
  );
}

export default App;
