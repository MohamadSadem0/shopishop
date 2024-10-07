import React from 'react';

const SectionCard = ({ section, onEdit, onDelete }) => {
  console.log(section);
  
  return (
    <div className="bg-white shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl p-7 mr-2 my-2 flex flex-col space-y-2">
       {/* Render Image if imageUrl is available */}
       {section.url && (
        <div className="my-2 flex justify-center">
          <img
            src={section.url}
            alt={section.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-bold">{section.name}</h3>

     

      <div className="flex space-x-2 justify-between items-center">
        <button
          onClick={() => onEdit(section)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(section.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SectionCard;
