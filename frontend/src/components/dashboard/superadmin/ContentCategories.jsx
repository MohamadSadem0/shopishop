import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../../../services/fetchingService';
import { fetchSections } from '../../../services/sectionService';
import AddCategoryForm from '../forms/AddCategoryForm';
import CategoryCard from '../cards/CategoryCard';
import ClipLoader from 'react-spinners/ClipLoader';

const ContentCategories = ({ searchQuery }) => {  // Add searchQuery prop
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('All');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedCategories = await fetchAllCategories();
        const fetchedSections = await fetchSections();
        setCategories(fetchedCategories);
        setSections(fetchedSections);
      } catch (err) {
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Handlers for category operations
  const handleCategoryAdded = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleCategoryDeleted = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
  };

  // Filtering categories based on selected section and search query
 // Modify the filter function to safely handle undefined values
const filteredCategories = categories.filter((category) => {
  const matchesSection =
    selectedSection === 'All' || category.sectionName === selectedSection;

  const name = category.name || ''; // Use empty string if undefined
  const description = category.description || ''; // Use empty string if undefined

  const matchesSearchQuery =
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    description.toLowerCase().includes(searchQuery.toLowerCase());

  return matchesSection && matchesSearchQuery; // Must match both section and search query
});


  return (
    <div className="p-8  w-full bg-[#F7F9EB]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <div>
          <select
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="All">All Sections</option>
            {sections.map((section) => (
              <option key={section.id} value={section.name}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <ClipLoader color="#4A90E2" size={50} />
      ) : (
        <>
          <button
            onClick={() => setIsAddCategoryOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Category
          </button>
          <div className="flex flex-wrap mt-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onDelete={handleCategoryDeleted}
                  onUpdate={handleCategoryUpdated}
                />
              ))
            ) : (
              <p className="mt-4 text-gray-600">No categories match the selected section.</p>
            )}
          </div>
          {isAddCategoryOpen && (
            <AddCategoryForm
              onClose={() => setIsAddCategoryOpen(false)}
              onCategoryAdded={handleCategoryAdded}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContentCategories;
