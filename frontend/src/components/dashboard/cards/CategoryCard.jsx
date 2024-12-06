import React from 'react';
import back2 from '../../../assets/images/back2.jpg';
import { useResponsiveDesign } from '../../../hooks/useResponsiveDesign';

const CategoryCard = ({ category, onDelete, onEdit }) => {
  const { isMobile, isDesktop } = useResponsiveDesign();

  return (
    <>
      {isDesktop ? (
        <div className="bg-white shadow-lg rounded-lg h-[250px]  desktop:w-[280px] md:w-[200px] laptop:w-[230px] m-0 overflow-hidden transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl my-2 flex flex-col space-y-2 ">
          <div className="h-full flex justify-between flex-col p-2">
            <div className="text-center flex justify-center flex-col">
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
        <div></div>
      )}
    </>
  );
};

export default CategoryCard;
