import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesBySection } from '../../redux/slices/categorySlice';
import { fetchProductsByCategory, fetchProductsByStore } from '../../redux/slices/productSlice';

const CategorySubNav = React.memo(({ storeId, sectionId }) => {
  const dispatch = useDispatch();
  const { categories, categoryStatus } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch categories if sectionId changes
  useEffect(() => {
    if (sectionId) {
      dispatch(fetchCategoriesBySection(sectionId));
    }
  }, [sectionId, dispatch]);

  // Handle category selection
  const handleCategoryClick = useCallback(
    (categoryId) => {
      setSelectedCategory(categoryId);
      if (categoryId === 'all') {
        dispatch(fetchProductsByStore(storeId)); // Reset to all products
      } else {
        dispatch(fetchProductsByCategory(categoryId));
      }
    },
    [dispatch, storeId]
  );

  if (categoryStatus === 'loading') return <p>Loading categories...</p>;
  if (categoryStatus === 'failed') return <p>Failed to load categories. Please try again later.</p>;

  return (
    <div className="bg-white shadow-sm rounded-md p-4 mb-4 flex gap-4 overflow-x-auto">
      <button
        className={`px-4 py-2 rounded-md ${
          selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        } hover:bg-blue-400 hover:text-white`}
        onClick={() => handleCategoryClick('all')}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } hover:bg-blue-400 hover:text-white`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
});

export default CategorySubNav;
