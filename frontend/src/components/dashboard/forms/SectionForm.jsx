import React, { useState } from 'react';
import useCloudinaryUpload from '../../../hooks/useCloudinaryUpload'; // Adjust the path as needed

const SectionForm = ({ initialSection = {}, onSave, onClose }) => {
  const { uploadImage, loading } = useCloudinaryUpload();
  const [section, setSection] = useState(initialSection);

  const handleSave = async () => {
    if (section.file) {
      try {
        const imageUrl = await uploadImage(section.file);
        onSave({ ...section, imageUrl });
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    } else {
      onSave(section);
    }
  };

  const handleChange = (field, value) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSection((prev) => ({ ...prev, file }));
  };

  const handleRemoveImage = () => {
    setSection((prev) => ({ ...prev, file: null, imageUrl: '' }));
  };

  return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-7/12">
          <h2 className="text-xl font-bold mb-4">
            {section.id ? 'Edit Section' : 'Add Section'}
          </h2>
          <input
              type="text"
              placeholder="Section Name"
              value={section.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="border p-2 mb-4 w-full"
              required
          />
          <div className="flex flex-col items-center mb-4">
            <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
              Upload Image
              <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
              />
            </label>
            {(section.file || section.imageUrl) && (
                <div className="relative mt-4">
                  <img
                      src={section.file ? URL.createObjectURL(section.file) : section.imageUrl}
                      alt="Uploaded Preview"
                      className="h-40 w-auto object-cover rounded-lg"
                  />
                  <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
            )}
          </div>
          {loading && <p className="text-blue-500">Uploading image...</p>}
          <div className="mt-4 flex justify-end space-x-2">
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
  );
};

export default SectionForm;
