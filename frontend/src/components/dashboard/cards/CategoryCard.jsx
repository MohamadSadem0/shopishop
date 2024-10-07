import React, { useState } from 'react';
import CategoryDetailPopup from '../forms/CategoryDetailPopup'; // Import the new popup component
import { updateCategory } from '../../../services/categoryAPI';

const CategoryCard = ({ category, onDelete, onUpdate }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({ ...category });
  const [error, setError] = useState('');

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsEditing(false);
  };
  const handleEdit = () => setIsEditing(true);
  const handleChange = (field, value) => {
    setEditedCategory(prev => ({ ...prev, [field]: value }));
  };
  const handleSave = async () => {
    try {
      await updateCategory(category.id, editedCategory);
      onUpdate(editedCategory);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(category.id);
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl p-7 mr-2 my-2 flex flex-col space-y-2">
          {category.imageUrl && (
        <div className="my-2 flex justify-center">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      )}
      <h3 className="text-lg">
        <span className="text-blue-500 font-bold">Name:</span>{' '}
        <span>{category.name}</span>
      </h3>
      <p className="text-sm text-gray-600">{category.description}</p>
      <p className="text-blue-500">
        <span className="text-lg font-bold">Section:</span>{' '}
        <span className="text-black">{category.sectionName}</span>
      </p>

      {/* Render Image if imageUrl is available */}


      <div className="flex space-x-2">
        <button
          onClick={handleOpenPopup}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
        >
          View Details
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
        >
          Delete
        </button>
      </div>

      {isPopupOpen && (
        <CategoryDetailPopup
          category={editedCategory}
          isEditing={isEditing}
          onClose={handleClosePopup}
          onSave={handleSave}
          onEdit={handleEdit}
          onChange={handleChange}
          error={error}
        />
      )}
    </div>
  );
};

export default CategoryCard;
