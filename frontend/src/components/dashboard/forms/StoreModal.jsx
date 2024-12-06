import React from 'react';

const StoreModal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white w-7/12 p-6 rounded-lg shadow-lg space-y-4 flex flex-col">
        {children}

        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex justify-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StoreModal;
