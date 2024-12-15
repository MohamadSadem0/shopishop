import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByStore,
  fetchProductsByCategory,
  filterProductsByCategory,
} from '../../redux/slices/productSlice';
import { fetchCategoriesBySection } from '../../redux/slices/categorySlice';

const ProductList = ({ className, storeId, sectionName }) => {
  const { products, filteredProducts, status } = useSelector((state) => state.products);
  const { categories, categoryStatus } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch products and categories based on store and section
  useEffect(() => {
    if (storeId) {
      dispatch(fetchProductsByStore(storeId));
    }
    if (sectionName) {
      dispatch(fetchCategoriesBySection(sectionName));
    }
  }, [storeId, sectionName, dispatch]);

  // Handle category filtering
  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategory('all');
      dispatch(fetchProductsByStore(storeId)); // Reset to all products
    } else {
      setSelectedCategory(categoryId);
      dispatch(fetchProductsByCategory({ storeId, categoryId }));
    }
  };

  if (status === 'loading' || categoryStatus === 'loading') return <p>Loading products...</p>;
  if (status === 'failed') return <p>Failed to load products. Please try again later.</p>;

  return (
    <div className={`bg-opacity-50 backdrop-blur-md bg-white min-h-screen p-8 lg:p-6 ${className}`}>
      <h2 className="font-bold text-2xl lg:text-3xl mb-6 text-left">Products</h2>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Filter by Category</h3>
          <ul className="flex gap-4 flex-wrap">
            <li
              className={`cursor-pointer px-4 py-2 rounded-md ${
                selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              } hover:bg-blue-400 hover:text-white`}
              onClick={() => handleCategoryClick('all')}
            >
              All Products
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                } hover:bg-blue-400 hover:text-white`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md bg-white"
            >
              <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/150?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">{product.isAvailable ? 'Available' : 'Out of Stock'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available for this category.</p>
      )}
    </div>
  );
};

export default ProductList;
