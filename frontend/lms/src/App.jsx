import { useState } from 'react';

/* ===== ADMIN COMPONENTS ===== */
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Students } from './components/Students';
import { Faculty } from './components/Faculty';
import { Departments } from './components/Departments';
import { Courses } from './components/Courses';
import { Announcements } from './components/Announcements';

/* ===== FACULTY COMPONENTS ===== */
import { FacultyLayout } from './faculty/FacultyLayout';
import { FacultyDashboard } from './faculty/FacultyDashboard';
import { FacultyAnnouncements } from './faculty/FacultyAnnouncements';
import { FacultyCourses } from './faculty/FacultyCourses';
import { CourseDetail } from './faculty/CourseDetail';

export default function App() {
  /* 🔐 Change this to 'faculty' to test faculty panel */
  const [role, setRole] = useState('admin'); // 'admin' | 'faculty'

  /* ===== ADMIN STATE ===== */
  const [adminPage, setAdminPage] = useState('dashboard');

  /* ===== FACULTY STATE ===== */
  const [facultyPage, setFacultyPage] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* ===== ADMIN ROUTER ===== */
  const renderAdminPage = () => {
    switch (adminPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'announcements':
        return <Announcements />;
      case 'students':
        return <Students />;
      case 'faculty':
        return <Faculty />;
      case 'departments':
        return <Departments />;
      case 'courses':
        return <Courses />;
      default:
        return <Dashboard />;
    }
  };

  /* ===== FACULTY ROUTER ===== */
  const renderFacultyPage = () => {
    if (facultyPage === 'courses' && selectedCourse) {
      return (
        <CourseDetail
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
        />
      );
    }

    switch (facultyPage) {
      case 'dashboard':
        return <FacultyDashboard />;
      case 'announcements':
        return <FacultyAnnouncements />;
      case 'courses':
        return (
          <FacultyCourses
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setFacultyPage('courses');
            }}
          />
        );
      default:
        return <FacultyDashboard />;
    }
  };

  /* ===== ROOT RENDER ===== */
  return (
    <>
      {/* 🔁 TEMP ROLE SWITCH (REMOVE LATER) */}
      <div className="fixed top-4 right-4 z-[100]">
        <button
          onClick={() => setRole(role === 'admin' ? 'faculty' : 'admin')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Switch to {role === 'admin' ? 'Faculty' : 'Admin'}
        </button>
      </div>

      {/* ===== ADMIN PANEL ===== */}
      {role === 'admin' && (
        <Layout currentPage={adminPage} setCurrentPage={setAdminPage}>
          {renderAdminPage()}
        </Layout>
      )}

      {/* ===== FACULTY PANEL ===== */}
      {role === 'faculty' && (
        <FacultyLayout
          currentPage={facultyPage}
          setCurrentPage={setFacultyPage}
        >
          {renderFacultyPage()}
        </FacultyLayout>
      )}
    </>
  );
}
