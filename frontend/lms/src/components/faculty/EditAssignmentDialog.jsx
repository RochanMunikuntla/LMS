import { useState } from "react";

export function EditAssignmentDialog({ assignment, onClose, onUpdate }) {
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [dueDate, setDueDate] = useState(assignment.dueDate);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && dueDate) {
      const updatedAssignment = {
        ...assignment,
        title,
        description,
        dueDate,
      };

      if (file) {
        updatedAssignment.fileName = file.name;
        updatedAssignment.fileSize =
          (file.size / 1024).toFixed(2) + " KB";
      }

      onUpdate(updatedAssignment);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl">Edit Assignment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors font-semibold"
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter assignment description"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-600 min-h-24"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Replace File (optional)
            </label>

            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="edit-assignment-file"
              />

              <label
                htmlFor="edit-assignment-file"
                className="flex items-center justify-center w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 hover:border-blue-600 cursor-pointer transition-colors"
              >
                <span>
                  {file ? file.name : "Choose new file (optional)"}
                </span>
              </label>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Current file: {assignment.fileName}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
