import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSections } from '../../redux/slices/sectionSlice';
import { filterStoresBySection } from '../../redux/slices/storeSlice';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const StoreSidebar = ({ className }) => {
  const { sections, status, error } = useSelector((state) => state.sections);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllSections());
    }
  }, [dispatch, status]);

  const handleSectionClick = (sectionName) => {
    dispatch(filterStoresBySection(sectionName));
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative bg-gradient-to-r from-white to-gray-100 bg-opacity-90 backdrop-blur-lg lg:w-1/4 px-6 pt-10 shadow-lg border-gray-300 border-r ${
        isOpen ? 'block' : 'w-16'
      } ${className}`}
    >
      <button
        className="absolute top-4 right-4 lg:hidden bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
      </button>

      {isOpen && (
        <>
          <h2 className="font-bold text-xl mb-6 text-gray-800 text-center lg:text-left">
            Sections
          </h2>
          {status === 'loading' && <p>Loading sections...</p>}
          {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
          {status === 'succeeded' && (
            <ul className="space-y-3">
              {sections.map((section, index) => (
                <li
                  key={section.id || index}
                  className="flex items-center cursor-pointer p-3 hover:bg-gray-300 hover:shadow-md rounded-md transition-all duration-200 ease-in-out text-gray-700"
                  onClick={() => handleSectionClick(section.name)}
                >
                  <span className="mr-3 w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-sm text-gray-600">
                    {section.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-lg">{section.name}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default StoreSidebar;
