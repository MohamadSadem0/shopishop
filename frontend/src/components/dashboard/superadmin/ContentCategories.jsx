import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../../../services/fetchingService';
import AddCategoryForm from '../forms/AddCategoryForm';
import CategoryCard from '../cards/CategoryCard'; // Import the card component

const ContentCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await fetchAllCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  // Handle adding a newly created category
  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]); // Add the new category to the list
  };

  // Handle deleting a category
  const handleCategoryDeleted = (deletedCategoryId) => {
    setCategories(categories.filter((category) => category.id !== deletedCategoryId));
  };

  // Handle updating a category
  const handleCategoryUpdated = (updatedCategory) => {
    setCategories(categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    ));
  };

  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <h2 className="text-2xl font-bold mb-8">Categories</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={() => setIsAddCategoryOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        + Add New Category
      </button>

      <div className="flex flex-wrap">
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onDelete={handleCategoryDeleted}
              onUpdate={handleCategoryUpdated}
            />
          ))
        )}
      </div>

      {isAddCategoryOpen && (
        <AddCategoryForm
          onClose={() => setIsAddCategoryOpen(false)} // Close the popup
          onCategoryAdded={handleCategoryAdded} // Callback for when a category is added
        />
      )}
    </div>
  );
};

export default ContentCategories;
