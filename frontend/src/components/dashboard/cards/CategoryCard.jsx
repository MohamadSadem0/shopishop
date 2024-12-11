import React from 'react';
import back2 from '../../../assets/images/back2.jpg';
import { useResponsiveDesign } from '../../../hooks/useResponsiveDesign';

const CategoryCard = ({ category, onDelete, onEdit }) => {
  const { isMobile, isDesktop } = useResponsiveDesign();

  return (
    <>
      {isDesktop ? (
        <div className="bg-white shadow-lg rounded-lg h-[250px] desktop:w-[280px] md:w-[200px] laptop:w-[230px] m-0 overflow-hidden transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl my-2 flex flex-col space-y-2">
          <div className="h-full flex justify-between flex-col p-2">
            <div className="text-center flex justify-center flex-col">
              {category.imageUrl ? (
                <div className="my-2 flex justify-center">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="my-2 flex justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                </div>
              )}

              <h3 className="text-lg">
                <span className="text-blue-500 font-bold">Name:</span>{' '}
                <span>{category.name || 'N/A'}</span>
              </h3>
              <p className="text-sm text-gray-600">
                {category.description || 'No description provided.'}
              </p>
              <p className="text-blue-500">
                <span className="text-lg font-bold">Section:</span>{' '}
                <span className="text-black">{category.sectionName || 'N/A'}</span>
              </p>
            </div>
            <div className="flex justify-center items-end space-x-2 box-border">
              <button
                onClick={onEdit} // Edit handler to open popup
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200 flex w-full justify-center"
              >
                Details
              </button>
              <button
                onClick={() => onDelete(category.id)} // Call onDelete with category ID
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200 flex w-full justify-center"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-cover bg-center rounded-lg h-[200px] w-full flex flex-col justify-end p-4"
          style={{ backgroundImage: `url(${back2})` }}
        >
          <div className="bg-black bg-opacity-50 text-white p-2 rounded-lg">
            <h3 className="text-lg font-bold">{category.name || 'N/A'}</h3>
            <p className="text-sm">{category.description || 'No description provided.'}</p>
            <p className="text-sm">
              <span className="font-bold">Section:</span> {category.sectionName || 'N/A'}
            </p>
            <div className="flex justify-between mt-2">
              <button
                onClick={onEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
              >
                Details
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryCard;
