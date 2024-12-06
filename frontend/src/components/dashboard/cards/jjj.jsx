import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { useFetchRedux } from '../../../hooks/useFetchRedux';
import { fetchAllCategories } from '../../../redux/slices/categorySlice';
import { fetchAllSections } from '../../../redux/slices/serviceSectionsSlice';
import CategoryCard from '../cards/CategoryCard';
import AddCategoryForm from '../forms/AddCategoryForm';
import CategoryDetailPopup from '../forms/CategoryDetailPopup';
import {deleteCategoryAPI} from "../../../services/deleteService";
import {updateCategoryAPI} from "../../../services/updateService";

const ContentCategories = ({ searchQuery, token }) => {
  const dispatch = useDispatch();

  // Fetch categories from Redux
  const categories = useSelector((state) => state.category.categories);
  const categoriesStatus = useSelector((state) => state.category.status);
  const categoriesError = useSelector((state) => state.category.error);

  // Use the `useFetchRedux` hook to fetch sections
  const {
    sections = [],
    status: sectionsStatus,
    error: sectionsError,
  } = useFetchRedux({
    sliceName: 'sections',
    fetchFunction: fetchAllSections,
  });

  // State Management
  const [selectedSection, setSelectedSection] = useState('All');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch categories on mount
  React.useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, categoriesStatus]);

  // Handle adding a new category
  const handleCategoryAdded = (newCategory) => {
    dispatch({ type: 'category/addCategory', payload: newCategory });
  };

  // Handle deleting a category
  const handleCategoryDeleted = async (id) => {
    setIsProcessing(true);
    try {
      await deleteCategoryAPI(id, token);
      dispatch({ type: 'category/deleteCategory', payload: id });
    } catch (err) {
      console.error(`Failed to delete category: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle updating a category
  const handleCategoryUpdated = async () => {
    setIsProcessing(true);
    try {
      const { id, name, description, imageUrl } = selectedCategory;
      await updateCategoryAPI(id, { name, description, imageUrl });
      dispatch({ type: 'category/updateCategory', payload: selectedCategory });
      handleClosePopup();
    } catch (err) {
      console.error(`Failed to update category: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle category field changes
  const handleCategoryChange = (field, value) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Open the popup for viewing/editing a category
  const handleOpenPopup = (category) => {
    setSelectedCategory({ ...category }); // Clone to avoid direct mutation
    setIsEditing(false);
  };

  // Close the popup
  const handleClosePopup = () => {
    setSelectedCategory(null);
    setIsEditing(false);
  };

  // Filter categories based on selected section and search query
  const filteredCategories = categories.filter((category) => {
    const matchesSection =
      selectedSection === 'All' || category.sectionName === selectedSection;

    const trimmedSearchQuery = searchQuery.trim().toLowerCase();
    const matchesSearchQuery =
      (category.name || '').toLowerCase().includes(trimmedSearchQuery) ||
      (category.description || '').toLowerCase().includes(trimmedSearchQuery);

    return matchesSection && matchesSearchQuery;
  });

  return (
    <div className="p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="flex flex-col">
          <div className="flex items-center">
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
            <button
              onClick={() => setIsAddCategoryOpen(true)}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add New Category
            </button>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {categoriesError && <p className="text-red-500">{categoriesError}</p>}
      {sectionsError && <p className="text-red-500">{sectionsError}</p>}

      {/* Loading Spinner */}
      {categoriesStatus === 'loading' || sectionsStatus === 'loading' ? (
        <ClipLoader color="#4A90E2" size={50} />
      ) : (
        <>
          {/* Category Cards */}
          <div className="flex flex-wrap justify-between">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onDelete={handleCategoryDeleted}
                  onEdit={() => handleOpenPopup(category)}
                  isProcessing={isProcessing}
                />
              ))
            ) : (
              <p className="text-gray-600">No categories found.</p>
            )}
          </div>

          {/* Add Category Form */}
          {isAddCategoryOpen && (
            <AddCategoryForm
              onClose={() => setIsAddCategoryOpen(false)}
              onCategoryAdded={handleCategoryAdded}
            />
          )}

          {/* Category Details/Editing Popup */}
          {selectedCategory && (
            <CategoryDetailPopup
              category={selectedCategory}
              isEditing={isEditing}
              onClose={handleClosePopup}
              onSave={handleCategoryUpdated}
              onEdit={() => setIsEditing(true)}
              onChange={handleCategoryChange} // Ensure this is passed
              isProcessing={isProcessing}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContentCategories;
