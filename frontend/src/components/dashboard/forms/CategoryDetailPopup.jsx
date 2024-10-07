import React from 'react';
const CategoryDetailPopup = ({ category, isEditing, onClose, onSave, onEdit, onChange, error }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{isEditing ? 'Edit Category' : 'Category Details'}</h2>
          <button onClick={onClose} className="text-lg font-semibold">&#10005;</button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={category.name || ''}
            onChange={e => onChange('name', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            readOnly={!isEditing}
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
          <textarea
            value={category.description || ''}
            onChange={e => onChange('description', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            readOnly={!isEditing}
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">Image URL</label>
          <input
            type="text"
            value={category.imageUrl || ''}
            onChange={e => onChange('imageUrl', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            readOnly={!isEditing}
          />
        </div>

        <div className="flex justify-end space-x-3">
          {isEditing ? (
            <button onClick={() => onSave(category)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          ) : (
            <button onClick={onEdit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
          )}
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPopup;
