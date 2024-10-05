// ContentCategories.jsx
import React, { useState, useEffect } from 'react';
import { createCategory, deleteCategory } from '../../../api/categoryAPI'; // Assuming you've placed the API calls in categoryAPI.js
import { fetchAllCategories } from '../../../services/fetchingService'; // Assuming you've placed the API calls in categoryAPI.js
import AddCategoryForm from './AddCategoryForm';

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
        setError('Failed to fetch categories.');
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (newCategory) => {
    try {
      const createdCategory = await createCategory(newCategory);
      setCategories([...categories, createdCategory]);
      setIsAddCategoryOpen(false); // Close the form after successful submission
    } catch (error) {
      setError('Failed to add category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      setError('Failed to delete category');
    }
  };

  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <h2 className="text-2xl font-bold mb-8">Categories</h2>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={() => setIsAddCategoryOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        + Add New Category
      </button>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Category Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="py-2 px-4 border-b">{category.name}</td>
              <td className="py-2 px-4 border-b">{category.description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddCategoryOpen && (
        <AddCategoryForm onClose={() => setIsAddCategoryOpen(false)} onCategoryAdded={handleAddCategory} />
      )}
    </div>
  );
};

export default ContentCategories;
