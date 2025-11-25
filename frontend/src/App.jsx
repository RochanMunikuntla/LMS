import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import StudentLoginPage from "./pages/Auth/StudentLoginPage";
import FacultyLoginPage from "./pages/Auth/FacultyLoginPage";
import AdminLoginPage from "./pages/Auth/AdminLoginPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/student/login" element={<StudentLoginPage />} />
      <Route path="/faculty/login" element={<FacultyLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/student/home" element={<Home />} />
      <Route path="/faculty/home" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
