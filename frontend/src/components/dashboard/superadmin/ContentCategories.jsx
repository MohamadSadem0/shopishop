import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {fetchAllCategoriesAPI, fetchSectionsAPI} from '../../../services/fetchingService';
import CategoryCard from '../cards/CategoryCard';
import AddCategoryForm from '../forms/AddCategoryForm';
import CategoryDetailPopup from '../forms/CategoryDetailPopup';
import { useFetchRedux } from '../../../hooks/useFetchRedux';
import { fetchAllSections } from '../../../redux/slices/serviceSectionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {deleteCategoryAPI} from "../../../services/deleteService";
import {updateCategoryAPI} from "../../../services/updateService";

const ContentCategories = ({ searchQuery, token }) => {
  // const [categories, setCategories] = useState([]);
  // const [sections, setSections] = useState([]);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);
  const categoriesStatus = useSelector((state) => state.category.status);
  const categoriesError = useSelector((state) => state.category.error);

  const [sections=[], sectionStatus,sectionError ]= useFetchRedux({
    sliceName: 'sections',
    fetchFunction: fetchAllSections,
  });
  const [selectedSection, setSelectedSection] = useState('All');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);


  useEffect(() => {
    
  },[])
  const handleCategoryAdded = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleCategoryDeleted = async (id) => {
    setIsProcessing(true);
    try {
      await deleteCategoryAPI(id, token);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(`Failed to delete category: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCategoryUpdated = async (updatedCategory) => {
    const { id, name, description, imageUrl } = updatedCategory;

    if (!id) {
      setError('Category ID is missing. Unable to update.');
      return;
    }

    const cleanCategory = { name, description, imageUrl };

    setIsProcessing(true);
    try {
      await updateCategoryAPI(id, cleanCategory);

      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...cleanCategory } : c))
      );
      setSelectedCategory(null);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update category: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCategoryChange = (field, value) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenPopup = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setSelectedCategory(null);
    setIsEditing(false);
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSection =
      selectedSection === 'All' || category.sectionName === selectedSection;

    const name = category.name || '';
    const description = category.description || '';

    const trimmedSearchQuery = searchQuery.trim().toLowerCase();
    const matchesSearchQuery =
      name.toLowerCase().includes(trimmedSearchQuery) ||
      description.toLowerCase().includes(trimmedSearchQuery);

    return matchesSection && matchesSearchQuery;
  });

  return (
    <div className="p-4 w-full bg-color3">
      {/* Wrapper div for heading, select section and add category button */}
      <div className="mb-4 flex flex-row justify-between items-center">
        {/* Section for heading */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Categories</h2>
        </div>

        {/* Section for Select Section dropdown and Add New Category button */}
        <div className="flex flex-col gap-2">
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Category
          </button>
        </div>
      </div>

      {/* Display Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      ) : (
        <>
          {/* Categories Display */}
          <div className="w-full flex flex-wrap items-center justify-between mt-4">
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
              onSave={handleCategoryUpdated}
              onEdit={() => setIsEditing(true)}
              onChange={handleCategoryChange}
              isProcessing={isProcessing}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContentCategories;
