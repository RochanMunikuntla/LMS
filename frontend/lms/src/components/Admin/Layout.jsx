import { Sidebar } from "./Sidebar";

export function Layout({ children, currentPage, setCurrentPage }) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
