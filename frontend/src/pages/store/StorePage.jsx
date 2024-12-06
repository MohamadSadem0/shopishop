import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCategoriesByStoreIdAPI, fetchProductsByStoreIdAPI } from '../../services/fetchingService';

const StorePage = () => {
  const { storeId } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories and products for the store
  useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchCategoriesByStoreIdAPI(storeId);
        const productsData = await fetchProductsByStoreIdAPI(storeId);
        setCategories(categoriesData);
        setProducts(productsData);
        setFilteredProducts(productsData); // Initially show all products
        setLoading(false);
      } catch (err) {
        setError('Failed to load store data.');
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [storeId]);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter((product) => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  }, [selectedCategory, products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="store-page">
      <h1 className="text-3xl font-bold mb-6">Store</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category-filter" className="mr-4">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card p-4 border hover:shadow-lg">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">Price: {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
