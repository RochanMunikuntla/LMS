import { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';

export function AddQuizDialog({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const resetState = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setError('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // ✅ JSON check
    if (!selectedFile.name.toLowerCase().endsWith('.json')) {
      setError('Only JSON files (.json) are allowed');
      setFile(null);
      return;
    }

    // ✅ Size limit (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 2 MB');
      setFile(null);
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !file || error) return;

    onAdd({
      title,
      description,
      fileName: file.name,
      fileSize: (file.size / 1024).toFixed(2) + ' KB',
      uploadDate: new Date().toLocaleDateString(),
    });

    resetState();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl">Add Quiz</h2>
          <button
            onClick={() => {
              resetState();
              onClose();
            }}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-600 focus:outline-none"
              placeholder="Enter quiz title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white min-h-24 focus:border-purple-600 focus:outline-none"
              placeholder="Enter quiz description"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Upload Quiz File (JSON)
            </label>

            <input
              type="file"
              id="quiz-json-file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              required
            />

            <label
              htmlFor="quiz-json-file"
              className="flex items-center justify-center gap-2 w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 cursor-pointer hover:border-purple-600 transition"
            >
              <Upload className="w-5 h-5" />
              <span>{file ? file.name : 'Choose JSON file (.json)'}</span>
            </label>

            {error && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {file && !error && (
              <p className="text-gray-500 text-sm mt-2">
                Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                resetState();
                onClose();
              }}
              className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!!error}
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              Add Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
