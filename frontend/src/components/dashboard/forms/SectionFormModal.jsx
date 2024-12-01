import React, { useState } from 'react';
import useCloudinaryUpload from '../../../hooks/useCloudinaryUpload';

const SectionFormModal = ({ isOpen, onClose, initialSection, onSave }) => {
  const { uploadImage, loading } = useCloudinaryUpload();
  const [section, setSection] = useState(initialSection);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (section.file) {
      const imageUrl = await uploadImage(section.file);
      onSave({ ...section, imageUrl, file: undefined });
    } else {
      onSave(section);
    }
  };

  const handleChange = (field, value) => {
    setSection(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setSection(prev => ({ ...prev, file: e.target.files[0] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{section.id ? 'Edit Section' : 'Add Section'}</h2>
          <button type="button" onClick={onClose} className="text-lg font-semibold">&#10005;</button>
        </div>

        <input
          type="text"
          value={section.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Section Name"
          required
        />
        
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        
        {loading && <p>Loading...</p>}

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SectionFormModal;
