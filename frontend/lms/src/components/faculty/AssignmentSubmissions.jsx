import { useState } from "react";
import { PDFViewer } from "./PDFViewer";

// Mock data for student submissions
const generateSubmissions = (assignmentTitle, dueDate) => {
  const students = [
    { id: 1, name: "Alice Johnson", rollNo: "CS2021001" },
    { id: 2, name: "Bob Smith", rollNo: "CS2021002" },
    { id: 3, name: "Charlie Brown", rollNo: "CS2021003" },
    { id: 4, name: "Diana Prince", rollNo: "CS2021004" },
    { id: 5, name: "Ethan Hunt", rollNo: "CS2021005" },
    { id: 6, name: "Fiona Green", rollNo: "CS2021006" },
  ];

  const due = new Date(dueDate);

  return students.map((student) => {
    const submitted = Math.random() > 0.2;

    if (!submitted) {
      return {
        ...student,
        submitted: false,
        grade: null,
      };
    }

    const randomDays = Math.floor(Math.random() * 10) - 3;
    const submissionDate = new Date(due);
    submissionDate.setDate(submissionDate.getDate() + randomDays);

    const daysLate = Math.max(
      0,
      Math.ceil((submissionDate - due) / (1000 * 60 * 60 * 24))
    );

    return {
      ...student,
      submitted: true,
      submissionDate: submissionDate.toLocaleDateString(),
      daysLate,
      fileName: `${student.rollNo}_assignment.pdf`,
      grade: null,
    };
  });
};

export function AssignmentSubmissions({ assignment, onClose }) {
  const [submissions, setSubmissions] = useState(
    generateSubmissions(assignment.title, assignment.dueDate)
  );
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [viewingPDF, setViewingPDF] = useState(null);

  const handleGrade = (studentId) => {
    if (gradeInput !== "" && gradeInput >= 0 && gradeInput <= 100) {
      setSubmissions(
        submissions.map((sub) =>
          sub.id === studentId
            ? { ...sub, grade: parseFloat(gradeInput) }
            : sub
        )
      );
      setSelectedStudent(null);
      setGradeInput("");
    }
  };

  const submittedCount = submissions.filter((s) => s.submitted).length;
  const gradedCount = submissions.filter((s) => s.grade !== null).length;
  const lateCount = submissions.filter(
    (s) => s.submitted && s.daysLate > 0
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-white text-xl mb-1">
              {assignment.title} - Submissions
            </h2>
            <p className="text-gray-400 text-sm">
              Due Date:{" "}
              {new Date(assignment.dueDate).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors font-semibold"
          >
            Close
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-800">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Submitted</div>
            <div className="text-white text-2xl">
              {submittedCount}/{submissions.length}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Graded</div>
            <div className="text-white text-2xl">
              {gradedCount}/{submittedCount}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">
              Late Submissions
            </div>
            <div className="text-white text-2xl">{lateCount}</div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white">
                        {submission.name}
                      </h3>
                      <span className="text-gray-400 text-sm">
                        ({submission.rollNo})
                      </span>

                      {!submission.submitted && (
                        <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-sm">
                          Not Submitted
                        </span>
                      )}

                      {submission.submitted &&
                        submission.daysLate > 0 && (
                          <span className="px-2 py-1 bg-orange-900/30 text-orange-400 rounded text-sm">
                            {submission.daysLate}{" "}
                            {submission.daysLate === 1
                              ? "day"
                              : "days"}{" "}
                            late
                          </span>
                        )}

                      {submission.submitted &&
                        submission.daysLate === 0 && (
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-sm">
                            On Time
                          </span>
                        )}
                    </div>

                    {submission.submitted && (
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div>
                          Submitted: {submission.submissionDate}
                        </div>
                        <button
                          onClick={() =>
                            setViewingPDF(submission)
                          }
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          {submission.fileName}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Grading */}
                  <div className="flex items-center gap-3">
                    {submission.submitted && (
                      <>
                        {submission.grade !== null ? (
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-gray-400 text-sm">
                                Grade
                              </div>
                              <div className="text-white text-xl">
                                {submission.grade}/100
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedStudent(submission.id);
                                setGradeInput(submission.grade);
                              }}
                              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm"
                            >
                              Edit
                            </button>
                          </div>
                        ) : selectedStudent ===
                          submission.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={gradeInput}
                              onChange={(e) =>
                                setGradeInput(e.target.value)
                              }
                              className="w-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-600"
                              placeholder="0-100"
                            />
                            <button
                              onClick={() =>
                                handleGrade(submission.id)
                              }
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStudent(null);
                                setGradeInput("");
                              }}
                              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setSelectedStudent(submission.id)
                            }
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Grade
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      {viewingPDF && (
        <PDFViewer
          submission={viewingPDF}
          onClose={() => setViewingPDF(null)}
        />
      )}
    </div>
  );
}
