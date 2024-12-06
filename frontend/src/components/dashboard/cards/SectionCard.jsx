import React from 'react';
import { useResponsiveDesign } from '../../../hooks/useResponsiveDesign';

const SectionCard = ({ section, onEdit, onDelete }) => {
  const { isMobile, isDesktop } = useResponsiveDesign();
  return (
    <>
      {isDesktop ? (
        <div className="bg-white shadow-lg rounded-lg h-[250px]  desktop:w-[280px] md:w-[200px] laptop:w-[230px] m-0 overflow-hidden transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl my-2 flex flex-col space-y-2 ">
          <div className="h-full flex justify-between flex-col p-2">
            {section.url && (
              <div className="my-2 flex justify-center">
                <img
                  src={section.url}
                  alt={section.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            )}
            <div className="text-center">
              <h3 className="text-lg">
                <span className="text-blue-500 font-bold">Name:</span>{' '}
                <span>{section.name}</span>
              </h3>
              <p className="text-sm text-gray-600">{section.description}</p>
            </div>

            <div className="flex justify-center items-end space-x-2 box-border">
              <button
                onClick={() => onEdit(section)} // Edit handler to open popup
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200 flex w-full justify-center"
              >
                Details
              </button>
              <button
                onClick={() => onDelete(section.id)} // Call onDelete with section ID
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

export default SectionCard;
