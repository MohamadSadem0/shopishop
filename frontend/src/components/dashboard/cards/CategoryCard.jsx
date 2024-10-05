// components/dashboard/cards/CategoryCard.jsx
import React, { useState } from 'react';
import { deleteCategory, updateCategory } from '../../../services/categoryAPI'; // Make sure you have the API call for updateCategory

const CategoryCard = ({ category, onDelete, onUpdate }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    name: category.name,
    description: category.description,
    imageUrl: category.imageUrl || '',
  });
  const [error, setError] = useState('');

  // Open popup to view or edit category
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setIsEditing(false);
  };

  // Save the edited category
  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
      await updateCategory(category.id, editedCategory, token);
      onUpdate({ ...category, ...editedCategory });
      closePopup();
    } catch (err) {
      setError('Failed to save changes');
    }
  };

  // Delete the category
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(category.id);
        onDelete(category.id);
        closePopup();
      } catch (error) {
        setError('Failed to delete category');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 w-full md:w-1/3 lg:w-1/4">
      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
      <p>{category.description}</p>

      <div className="mt-4 flex justify-between">
        <button
          onClick={openPopup}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>

      {/* Popup for viewing and editing */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? 'Edit Category' : 'Category Details'}
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={editedCategory.name}
                  onChange={(e) =>
                    setEditedCategory({ ...editedCategory, name: e.target.value })
                  }
                  className="border p-2 mb-4 w-full"
                />
                <input
                  type="text"
                  value={editedCategory.description}
                  onChange={(e) =>
                    setEditedCategory({
                      ...editedCategory,
                      description: e.target.value,
                    })
                  }
                  className="border p-2 mb-4 w-full"
                />
                <input
                  type="text"
                  value={editedCategory.imageUrl}
                  onChange={(e) =>
                    setEditedCategory({
                      ...editedCategory,
                      imageUrl: e.target.value,
                    })
                  }
                  className="border p-2 mb-4 w-full"
                  placeholder="Image URL"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p><strong>Name:</strong> {category.name}</p>
                <p><strong>Description:</strong> {category.description}</p>
                <p><strong>Image URL:</strong> {category.imageUrl || 'N/A'}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
                >
                  Edit
                </button>
              </div>
            )}

            <button
              onClick={closePopup}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
