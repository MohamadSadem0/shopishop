import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

const ContentSeeAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  // Fetch products when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('merchant/products/store/2'); // Adjust the API endpoint as needed
        setProducts(response.data); // Assume the response contains an array of products
        console.log(response)
      } catch (error) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <h2 className="text-2xl font-bold mb-8">All Products</h2>
      
      {error && <p className="text-red-500">{error}</p>}
      
      {/* If there are no products */}
      {products.length === 0 && !error && (
        <p className="text-gray-500">No products available.</p>
      )}
      
      {/* Display products */}
      {products.length > 0 && (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">${product.price}</td>
                <td className="py-2 px-4 border-b">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContentSeeAllProducts;
