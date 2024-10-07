// SectionDetailPopup.jsx
import React from 'react';

const SectionDetailPopup = ({ section, onClose, onSave, onChange }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold">{section.id ? 'Edit Section' : 'View Section'}</h2>
        <input
  type="text"
  value={section.name}
  onChange={(e) => onChange({...section, name: e.target.value})}
  className="border p-2 w-full"
/>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SectionDetailPopup;
