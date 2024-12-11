import { Close } from '@mui/icons-material';
import React from 'react';

const CategoryDetailPopup = ({
  category,
  isEditing,
  onClose,
  onSave,
  onEdit,
  onChange,
  error,
  isProcessing,
}) => {
  if (!category) return null;

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white w-11/12 sm:w-7/12 p-6 rounded-lg shadow-lg space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            {isEditing ? 'Edit Category' : 'Category Details'}
          </h2>
          <button onClick={onClose} className="text-lg font-semibold">
            <Close
              style={{
                fontSize: 25,
                color: 'black',
                transition: 'color 0.3s ease, transform 0.3s ease',
                stroke: 'black',
              }}
              className="hover:text-gray-500 hover:scale-110"
            />
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Form Fields */}
        <div>
          {/* Name Field */}
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={category.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            readOnly={!isEditing || isProcessing}
          />

          {/* Description Field */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Description
          </label>
          <textarea
            value={category.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            readOnly={!isEditing || isProcessing}
          ></textarea>

          {/* Image Section */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Image
          </label>
          <div className="relative w-full border border-gray-300 rounded-md shadow-sm p-3">
            {category.imageUrl ? (
              <div className="flex justify-between">
                <img
                  src={category.imageUrl}
                  alt={category.name || 'Category Image'}
                  className="max-w-sm rounded max-h-40"
                />
                {isEditing && !isProcessing && (
                  <button
                    onClick={() => onChange('imageUrl', '')}
                    className="absolute top-0 right-1 text-gray-500 hover:text-gray-700"
                  >
                    <Close
                      style={{
                        fontSize: 20,
                        color: 'black',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                        stroke: 'black',
                      }}
                      className="hover:scale-110"
                    />
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-500 italic">No image available</p>
            )}
          </div>

          {/* Image URL Field */}
          {isEditing && (
            <>
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Image URL
              </label>
              <input
                type="text"
                value={category.imageUrl || ''}
                onChange={(e) => onChange('imageUrl', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={isProcessing}
              />
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => onSave(category)}
                className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isProcessing}
              >
                Save Changes
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                disabled={isProcessing}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                disabled={isProcessing}
              >
                Edit
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPopup;
