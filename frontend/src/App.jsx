import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import StudentLoginPage from "./pages/Auth/StudentLoginPage";
import FacultyLoginPage from "./pages/Auth/FacultyLoginPage";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/student/login" element={<StudentLoginPage />} />
      <Route path="/faculty/login" element={<FacultyLoginPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
