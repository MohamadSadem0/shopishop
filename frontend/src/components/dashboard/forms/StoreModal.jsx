import React from 'react';

const StoreModal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg space-y-6 flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default StoreModal;
