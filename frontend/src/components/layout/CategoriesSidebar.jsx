import React, { useState, useEffect } from 'react';
import { fetchAllStoresAPI } from "../../services/fetchingService"; // Assuming this API fetches all approved stores

const CategoriesSidebar = ({ sections, setStores, setSelectedSection }) => {
  const [expandedSection, setExpandedSection] = useState(null); // Track only the currently expanded section
  const [allStores, setAllStores] = useState([]); // Store all approved stores

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const stores = await fetchAllStoresAPI(); // Fetch all approved stores
        setAllStores(stores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const toggleSection = (sectionName) => {
    // If the section is already expanded, collapse it
    if (expandedSection === sectionName) {
      setExpandedSection(null);
      setStores([]); // Clear displayed stores
      return;
    }

    // Filter stores by sectionName
    const filteredStores = allStores.filter(
      (store) => store.sectionName === sectionName
    );

    setStores(filteredStores); // Update the displayed stores
    setSelectedSection(sectionName); // Update the selected section
    setExpandedSection(sectionName); // Expand the section
  };

  return (
    <div className="ml-3 w-1/6 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Sections</h2>
      {sections.map((section) => (
        <div key={section.id} className="mb-4">
          <button
            className="w-full text-left py-3 px-4 font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 flex justify-between"
            onClick={() => toggleSection(section.name)} // Use sectionName to filter stores
          >
            {section.name}
            <span>{expandedSection === section.name ? '-' : '+'}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSidebar;
