import React from 'react';

const CategoryCard = ({ category, onDelete, onEdit }) => {
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

      <div className="flex space-x-2">
        <button
          onClick={onEdit} // Edit handler to open popup
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
        >
          View Details
        </button>
        <button
          onClick={() => onDelete(category.id)} // Call onDelete with category ID
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
