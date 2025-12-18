import { useState } from "react";

export function AddMaterialDialog({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (selectedFile.size > maxSize) {
        setError("File size must not exceed 5 MB");
        setFile(null);
        return;
      }

      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && file && !error) {
      onAdd({
        title,
        description,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        uploadDate: new Date().toLocaleDateString(),
      });

      setTitle("");
      setDescription("");
      setFile(null);
      setError("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl">Add Study Material</h2>
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
              placeholder="Enter material title"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter material description"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-600 min-h-24"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              File Upload (Max 5 MB)
            </label>

            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="material-file"
                required
              />

              <label
                htmlFor="material-file"
                className="flex items-center justify-center w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 hover:border-green-600 cursor-pointer transition-colors"
              >
                <span>
                  {file ? file.name : "Choose file (max 5 MB)"}
                </span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm mt-2">
                {error}
              </p>
            )}

            {/* File Info */}
            {file && !error && (
              <p className="text-gray-500 text-sm mt-2">
                Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
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
              disabled={!!error}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
