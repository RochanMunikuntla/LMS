import { FacultySidebar } from "./FacultySidebar";

export function FacultyLayout({ children, currentPage, setCurrentPage }) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <FacultySidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
