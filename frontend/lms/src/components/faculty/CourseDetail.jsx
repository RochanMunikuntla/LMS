import { useState } from "react";
import { AddAssignmentDialog } from "./AddAssignmentDialog";
import { AddQuizDialog } from "./AddQuizDialog";
import { AddMaterialDialog } from "./AddMaterialDialog";
import { EditAssignmentDialog } from "./EditAssignmentDialog";
import { EditQuizDialog } from "./EditQuizDialog";
import { EditMaterialDialog } from "./EditMaterialDialog.jsx";
import { AssignmentSubmissions } from "./AssignmentSubmissions";

export function CourseDetail({ course, onBack }) {
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [materials, setMaterials] = useState([]);

  const handleAddAssignment = (assignment) => {
    setAssignments([...assignments, { ...assignment, id: Date.now() }]);
    setShowAssignmentDialog(false);
  };

  const handleUpdateAssignment = (updated) => {
    setAssignments(assignments.map(a => a.id === updated.id ? updated : a));
    setEditingAssignment(null);
  };

  const handleDeleteAssignment = (id) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const handleAddQuiz = (quiz) => {
    setQuizzes([...quizzes, { ...quiz, id: Date.now() }]);
    setShowQuizDialog(false);
  };

  const handleUpdateQuiz = (updated) => {
    setQuizzes(quizzes.map(q => q.id === updated.id ? updated : q));
    setEditingQuiz(null);
  };

  const handleDeleteQuiz = (id) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      setQuizzes(quizzes.filter(q => q.id !== id));
    }
  };

  const handleAddMaterial = (material) => {
    setMaterials([...materials, { ...material, id: Date.now() }]);
    setShowMaterialDialog(false);
  };

  const handleUpdateMaterial = (updated) => {
    setMaterials(materials.map(m => m.id === updated.id ? updated : m));
    setEditingMaterial(null);
  };

  const handleDeleteMaterial = (id) => {
    if (confirm("Are you sure you want to delete this material?")) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white mb-4 transition-colors"
        >
          ← Back to Courses
        </button>

        <div className={`bg-gradient-to-br ${colorClasses[course.color]} rounded-xl p-8`}>
          <h1 className="text-white text-3xl mb-2">{course.name}</h1>
          <p className="text-white/80">
            {course.code} • {course.department}
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setShowAssignmentDialog(true)}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-600 text-left"
        >
          <div className="text-blue-400 font-semibold mb-4">Assignment</div>
          <h3 className="text-white text-lg mb-2">Add Assignment</h3>
          <p className="text-gray-400 text-sm">Upload assignments for students</p>
        </button>

        <button
          onClick={() => setShowQuizDialog(true)}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-600 text-left"
        >
          <div className="text-purple-400 font-semibold mb-4">Quiz</div>
          <h3 className="text-white text-lg mb-2">Add Quiz</h3>
          <p className="text-gray-400 text-sm">Upload quiz in GIFT format</p>
        </button>

        <button
          onClick={() => setShowMaterialDialog(true)}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-600 text-left"
        >
          <div className="text-green-400 font-semibold mb-4">Material</div>
          <h3 className="text-white text-lg mb-2">Add Material</h3>
          <p className="text-gray-400 text-sm">Share study materials</p>
        </button>
      </div>

      {/* Assignments */}
      <Section
        title={`Assignments (${assignments.length})`}
        emptyText="No assignments added yet"
        items={assignments}
        color="blue"
        onEdit={setEditingAssignment}
        onDelete={handleDeleteAssignment}
        onExtraAction={setShowSubmissions}
        extraActionLabel="View Submissions"
      />

      {/* Quizzes */}
      <Section
        title={`Quizzes (${quizzes.length})`}
        emptyText="No quizzes added yet"
        items={quizzes}
        color="purple"
        onEdit={setEditingQuiz}
        onDelete={handleDeleteQuiz}
      />

      {/* Materials */}
      <Section
        title={`Study Materials (${materials.length})`}
        emptyText="No materials added yet"
        items={materials}
        color="green"
        onEdit={setEditingMaterial}
        onDelete={handleDeleteMaterial}
      />

      {/* Dialogs */}
      {showAssignmentDialog && (
        <AddAssignmentDialog onClose={() => setShowAssignmentDialog(false)} onAdd={handleAddAssignment} />
      )}
      {showQuizDialog && (
        <AddQuizDialog onClose={() => setShowQuizDialog(false)} onAdd={handleAddQuiz} />
      )}
      {showMaterialDialog && (
        <AddMaterialDialog onClose={() => setShowMaterialDialog(false)} onAdd={handleAddMaterial} />
      )}
      {showSubmissions && (
        <AssignmentSubmissions assignment={showSubmissions} onClose={() => setShowSubmissions(null)} />
      )}
      {editingAssignment && (
        <EditAssignmentDialog assignment={editingAssignment} onClose={() => setEditingAssignment(null)} onUpdate={handleUpdateAssignment} />
      )}
      {editingQuiz && (
        <EditQuizDialog quiz={editingQuiz} onClose={() => setEditingQuiz(null)} onUpdate={handleUpdateQuiz} />
      )}
      {editingMaterial && (
        <EditMaterialDialog material={editingMaterial} onClose={() => setEditingMaterial(null)} onUpdate={handleUpdateMaterial} />
      )}
    </div>
  );
}

/* Reusable section */
function Section({ title, emptyText, items, onEdit, onDelete, onExtraAction, extraActionLabel }) {
  return (
    <div>
      <h2 className="text-white text-xl mb-4">{title}</h2>
      {items.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <p className="text-gray-400">{emptyText}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-white text-lg mb-1">{item.title}</h3>
              <p className="text-gray-400 mb-2">{item.description}</p>
              <div className="text-gray-400 text-sm">File: {item.fileName}</div>

              <div className="flex gap-2 mt-4">
                {onExtraAction && (
                  <button
                    onClick={() => onExtraAction(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    {extraActionLabel}
                  </button>
                )}
                <button
                  onClick={() => onEdit(item)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
