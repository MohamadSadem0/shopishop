import React, { useState, useEffect } from 'react';
import { fetchAllProducts, createProduct, deleteProduct } from '../../../api/productAPI'; // Assuming API calls are placed in productAPI.js
import AddProductForm from './AddProductForm'; // Assuming a form component for adding products

const ContentProducts = ({ searchQuery }) => { // Accept searchQuery prop from parent
  const [products, setProducts] = useState([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch products.');
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setIsAddProductOpen(false); // Close the form after successful submission
    } catch (error) {
      setError('Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      setError('Failed to delete product');
    }
  };

  // Filter products based on searchQuery
  const filteredProducts = products.filter((product) => {
    const name = product.name || ''; // Handle undefined names
    const description = product.description || ''; // Handle undefined descriptions
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-8  w-full bg-color3">
      <h2 className="text-2xl font-bold mb-8">Products</h2>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={() => setIsAddProductOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        + Add New Product
      </button>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddProductOpen && (
        <AddProductForm onClose={() => setIsAddProductOpen(false)} onProductAdded={handleAddProduct} />
      )}
    </div>
  );
};

export default ContentProducts;
