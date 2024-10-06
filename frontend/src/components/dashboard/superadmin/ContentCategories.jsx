import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../../../services/fetchingService';
import AddCategoryForm from '../forms/AddCategoryForm';
import CategoryCard from '../cards/CategoryCard'; // Import the card component
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner

const ContentCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedCategories = await fetchAllCategories();
        setCategories(fetchedCategories);
        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false); // Stop loading even if there is an error
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleCategoryDeleted = (deletedCategoryId) => {
    setCategories(categories.filter((category) => category.id !== deletedCategoryId));
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories(categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    ));
  };

  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <h2 className="text-2xl font-bold mb-8">Categories</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#4A90E2" size={50} />  
        </div>
      ) : (
        <>
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
