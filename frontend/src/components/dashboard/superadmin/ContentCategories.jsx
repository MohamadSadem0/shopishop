import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  deleteExistingCategory,
  fetchAllCategories,
  updateExistingCategory,
} from '../../../redux/slices/categorySlice';
import { fetchAllSections } from '../../../redux/slices/sectionSlice';
import CategoryCard from '../cards/CategoryCard';
import AddCategoryForm from '../forms/AddCategoryForm';
import CategoryDetailPopup from '../forms/CategoryDetailPopup';

const ContentCategories = ({ searchQuery }) => {
  const dispatch = useDispatch();

  // Redux state selectors
  const sections = useSelector((state) => state.sections.sections || []);
  const sectionStatus = useSelector((state) => state.sections.status);
  const sectionError = useSelector((state) => state.sections.error);

  const categories = useSelector((state) => state.categories.categories || []);
  const categoryStatus = useSelector((state) => state.categories.status);
  const categoryError = useSelector((state) => state.categories.error);

  // Local state for UI behavior
  const [selectedSection, setSelectedSection] = useState('All');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch sections and categories on mount
  useEffect(() => {
    if (sectionStatus === 'idle') {
      dispatch(fetchAllSections());
    }
    if (categoryStatus === 'idle') {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, sectionStatus, categoryStatus]);

  // Open popup to edit category
  const handleOpenPopup = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setSelectedCategory(null);
    setIsEditing(false);
  };

  // Handle category updates
  const handleCategoryChange = (field, value) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save updated category
  const handleSaveCategory = async (updatedCategory) => {
    setIsProcessing(true);
    try {
      await dispatch(
        updateExistingCategory({
          categoryId: updatedCategory.id,
          categoryData: updatedCategory,
        })
      ).unwrap();
      dispatch(fetchAllCategories());
      handleClosePopup();
    } catch (err) {
      console.error('Failed to update category:', err);
      alert('Failed to update category. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Refetch categories after addition
  const handleCategoryAdded = () => {
    dispatch(fetchAllCategories());
  };

  // Delete a category
  const handleDeleteCategory = async (categoryId) => {
    setIsProcessing(true);
    try {
      await dispatch(deleteExistingCategory(categoryId)).unwrap();
      dispatch(fetchAllCategories());
    } catch (err) {
      console.error('Failed to delete category:', err);
      alert('Failed to delete category. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter categories based on search query and section
  const filteredCategories = categories.filter((category) => {
    const matchesSection =
      selectedSection === 'All' || category.sectionName === selectedSection;

    const trimmedSearchQuery = searchQuery?.trim().toLowerCase() || '';
    const matchesSearchQuery =
      category.name?.toLowerCase().includes(trimmedSearchQuery) ||
      category.description?.toLowerCase().includes(trimmedSearchQuery);

    return matchesSection && matchesSearchQuery;
  });

  return (
    <div className="p-4 w-full bg-color3">
      {/* Header with section selection and Add Category button */}
      <div className="mb-4 flex flex-row justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold">Categories</h2>
        <div className="flex flex-col gap-2">
          <select
            value={selectedSection}
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Add New Category'}
          </button>
        </div>
      </div>

      {/* Errors */}
      {sectionError && <p className="text-red-500">{sectionError}</p>}
      {categoryError && <p className="text-red-500">{categoryError}</p>}

      {/* Loading Spinner */}
      {(categoryStatus === 'loading' || sectionStatus === 'loading') && (
        <div className="flex justify-center">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      )}

      {/* Content */}
      {categoryStatus !== 'loading' && sectionStatus !== 'loading' && (
        <>
          {/* Categories Display */}
          <div className="w-full flex flex-wrap items-center justify-between mt-4 ">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={() => handleOpenPopup(category)}
                  onDelete={() => handleDeleteCategory(category.id)}
                  isProcessing={isProcessing}
                />
              ))
            ) : (
              <p className="mt-4 text-gray-600 w-full text-center">
                No categories match the selected section.
              </p>
            )}
          </div>

          {/* Add Category Form */}
          {isAddCategoryOpen && (
            <AddCategoryForm
              onClose={() => setIsAddCategoryOpen(false)}
              onCategoryAdded={handleCategoryAdded}
            />
          )}

          {/* Category Detail Popup */}
          {selectedCategory && (
            <CategoryDetailPopup
              category={selectedCategory}
              isEditing={isEditing}
              onClose={handleClosePopup}
              onChange={handleCategoryChange}
              onSave={handleSaveCategory}
              isProcessing={isProcessing}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContentCategories;
