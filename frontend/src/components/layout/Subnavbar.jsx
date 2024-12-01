import React from 'react';

const SubNavbar = React.memo(({ sections, setSelectedSection }) => {
  return (
    <div className="w-full bg-white shadow-lg">
      <div className="flex justify-center items-center py-4">
        {sections.map((section) => (
          <button
            key={section.sectionId}
            className="mx-4 px-4 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-color1 rounded-md transition duration-300"
            onClick={() => setSelectedSection(section.sectionId)} // Trigger section product fetch
          >
            {section.sectionName}
          </button>
        ))}
      </div>
    </div>
  );
});

export default SubNavbar;
