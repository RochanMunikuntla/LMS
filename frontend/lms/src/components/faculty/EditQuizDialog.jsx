import { useState } from "react";

export function EditQuizDialog({ quiz, onClose, onUpdate }) {
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith(".gift")) {
        alert("Only GIFT format files are accepted");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description) {
      const updatedQuiz = {
        ...quiz,
        title,
        description,
      };

      if (file) {
        updatedQuiz.fileName = file.name;
        updatedQuiz.fileSize =
          (file.size / 1024).toFixed(2) + " KB";
      }

      onUpdate(updatedQuiz);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl">Edit Quiz</h2>
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
              required
              placeholder="Enter quiz title"
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
              required
              placeholder="Enter quiz description"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-600 min-h-24"
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
                accept=".gift"
                onChange={handleFileChange}
                className="hidden"
                id="edit-quiz-file"
              />

              <label
                htmlFor="edit-quiz-file"
                className="flex items-center justify-center w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 hover:border-blue-600 cursor-pointer transition-colors"
              >
                <span>
                  {file
                    ? file.name
                    : "Choose new GIFT file (optional)"}
                </span>
              </label>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Current file: {quiz.fileName}
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
              Update Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
