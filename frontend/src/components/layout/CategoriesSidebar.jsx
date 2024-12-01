import React, { useState } from 'react';
import { fetchProductsBySection } from '../../services/productService'; // Assuming this is the function to fetch products by section

const CategoriesSidebar = ({ sections, setSelectedCategory, setProducts, setSelectedSection }) => {
  const [expandedSection, setExpandedSection] = useState(null); // Track only the currently expanded section

  const toggleSection = async (sectionId) => {
    // If the section is already expanded, collapse it
    if (expandedSection === sectionId) {
      setExpandedSection(null);
      return;
    }

    // Fetch products for the newly expanded section
    try {
      const fetchedProducts = await fetchProductsBySection(sectionId);
      setProducts(fetchedProducts); // Update the products in the grid
      setSelectedSection(sectionId); // Update selected section
    } catch (error) {
      console.error('Error fetching products by section:', error);
    }

    // Expand the section
    setExpandedSection(sectionId);
  };

  return (
    <div className="ml-3 w-1/6 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Categories</h2>
      {sections.map((section) => (
        <div key={section.sectionId} className="mb-4">
          <button
            className="w-full text-left py-3 px-4 font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 flex justify-between"
            onClick={() => toggleSection(section.sectionId)} // Toggle current section
          >
            {section.sectionName}
            <span>{expandedSection === section.sectionId ? '-' : '+'}</span>
          </button>

          {/* Only show categories if the section is expanded */}
          {expandedSection === section.sectionId && (
            <div className="mt-2 ml-4">
              {section.categories.length > 0 ? (
                section.categories.map((category) => (
                  <button
                    key={category.id}
                    className="block w-full text-left py-2 px-4 font-medium hover:bg-gray-100"
                    onClick={() => setSelectedCategory(category.name)} // Filter products by category
                  >
                    {category.name}
                  </button>
                ))
              ) : (
                <p className="ml-4 mt-2 text-gray-500">No categories available</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriesSidebar;
