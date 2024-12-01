import React, { useState, useEffect } from 'react';
import { fetchAllCategoriesAPI } from '../../../services/fetchingService';
import { fetchSections } from '../../../services/sectionService';
import { deleteCategory, updateCategory } from '../../../services/categoryAPI'; // Consolidate imports
import AddCategoryForm from '../forms/AddCategoryForm';
import CategoryCard from '../cards/CategoryCard';
import ClipLoader from 'react-spinners/ClipLoader';
import CategoryDetailPopup from '../forms/CategoryDetailPopup';

const ContentCategories = ({ searchQuery, token }) => {
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('All');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // To manage loading state during actions like delete and update

  useEffect(() => {
    async function loadData() {
      setLoading(true); // Show loading indicator during data fetch
      try {
        const fetchedCategories = await fetchAllCategoriesAPI();
        const fetchedSections = await fetchSections();
        setCategories(fetchedCategories);
        setSections(fetchedSections);
      } catch (err) {
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false); // Hide loading indicator once data is fetched
      }
    }
    loadData();
  }, []);

  // Handle adding a new category
  const handleCategoryAdded = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  // Handle deleting a category with a confirmation
  const handleCategoryDeleted = async (id) => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    // if (!confirmDelete) return;

    setIsProcessing(true); // Show loading indicator during delete operation
    try {
      await deleteCategory(id, token); // Call the API to delete the category from the database
      setCategories((prev) => prev.filter((c) => c.id !== id)); // Remove it from the state
    } catch (err) {
      setError(`Failed to delete category: ${err.message}`);
    } finally {
      setIsProcessing(false); // Hide processing indicator after completion
    }
  };

  const handleCategoryUpdated = async (updatedCategory) => {
    const { id, name, description, imageUrl } = updatedCategory; // Destructure to include id
  
    if (!id) {
      setError('Category ID is missing. Unable to update.');
      return;
    }
  
    const cleanCategory = { name, description, imageUrl }; // Only send necessary fields
    
    setIsProcessing(true); // Show loading indicator during update
    try {
      await updateCategory(id, cleanCategory); // Pass the id and the clean data to the update API
      
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...cleanCategory } : c))
      );
      setSelectedCategory(null);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update category: ' + err.message);
    } finally {
      setIsProcessing(false); // Hide processing indicator after completion
    }
  };
  
  
  

  // Handle the change in category fields
  const handleCategoryChange = (field, value) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [field]: value, // Dynamically update the field
    }));
  };

  const handleOpenPopup = (category) => { 
    if (!category || !category.id) {
      console.error('Invalid category object or missing ID');
      return;
    }
  
    // Log the category object to make sure the `id` is present
  
    setSelectedCategory(category); // Ensure the full category object is passed with the id
    setIsEditing(true);
  };
  

  const handleClosePopup = () => {
    setSelectedCategory(null);
    setIsEditing(false);
  };

  // Filter categories based on section and search query
  const filteredCategories = categories.filter((category) => {
    const matchesSection =
      selectedSection === 'All' || category.sectionName === selectedSection;

    const name = category.name || '';
    const description = category.description || '';

    const trimmedSearchQuery = searchQuery.trim().toLowerCase(); // Trim and convert to lowercase for consistency
    const matchesSearchQuery =
      name.toLowerCase().includes(trimmedSearchQuery) ||
      description.toLowerCase().includes(trimmedSearchQuery);

    return matchesSection && matchesSearchQuery;
  });

  return (
    <div className="p-8 w-full bg-color3 ">
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
                  onDelete={handleCategoryDeleted} // Pass the delete handler here
                  onEdit={() => handleOpenPopup(category)}
                  isProcessing={isProcessing} // Indicate whether an action is in progress
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

          {selectedCategory && (
            <CategoryDetailPopup
              category={selectedCategory}
              isEditing={isEditing}
              onClose={handleClosePopup}
              onSave={handleCategoryUpdated}
              onEdit={() => setIsEditing(true)}
              onChange={handleCategoryChange} // Pass the onChange handler here
              isProcessing={isProcessing} // Indicate whether an action is in progress
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContentCategories;
