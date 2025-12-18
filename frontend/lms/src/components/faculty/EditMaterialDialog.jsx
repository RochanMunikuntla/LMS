import { useState } from "react";

export function EditMaterialDialog({ material, onClose, onUpdate }) {
  const [title, setTitle] = useState(material.title);
  const [description, setDescription] = useState(material.description);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (selectedFile.size > maxSize) {
        alert("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description) {
      const updatedMaterial = {
        ...material,
        title,
        description,
      };

      if (file) {
        updatedMaterial.fileName = file.name;
        updatedMaterial.fileSize =
          (file.size / 1024).toFixed(2) + " KB";
      }

      onUpdate(updatedMaterial);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl">Edit Material</h2>
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
              placeholder="Enter material title"
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
              placeholder="Enter material description"
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
                onChange={handleFileChange}
                className="hidden"
                id="edit-material-file"
              />

              <label
                htmlFor="edit-material-file"
                className="flex items-center justify-center w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 hover:border-blue-600 cursor-pointer transition-colors"
              >
                <span>
                  {file
                    ? file.name
                    : "Choose new file (optional, max 5MB)"}
                </span>
              </label>
            </div>

            {file && (
              <p className="text-gray-500 text-sm mt-2">
                New file size: {(file.size / 1024).toFixed(2)} KB
              </p>
            )}

            <p className="text-gray-500 text-sm mt-2">
              Current file: {material.fileName}
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
              Update Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
