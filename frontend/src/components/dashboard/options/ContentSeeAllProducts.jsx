import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Assuming you use CryptoJS for decryption
import { fetchProductsByStoreId } from '../../../services/productService'; // Import the service function

// Your encryption key from environment variables
const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

const ContentSeeAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper function to decrypt the store ID
  const decryptStoreId = (encryptedStore) => {
    if (!encryptedStore || !encryptionKey) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedStore, encryptionKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Error decrypting store ID:", error);
      return null;
    }
  };

  // Helper function to decrypt the token
  const decryptToken = (encryptedToken) => {
    if (!encryptedToken || !encryptionKey) return null;
    try {
      return CryptoJS.AES.decrypt(encryptedToken, encryptionKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error decrypting token:", error);
      return null;
    }
  };

  // Fetch products when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading

        // Decrypt the storeId from sessionStorage
        const encryptedStore = sessionStorage.getItem('store');
        const store = decryptStoreId(encryptedStore);
        const storeId = store?.id;

        // Decrypt the JWT token from sessionStorage
        const encryptedToken = sessionStorage.getItem('authToken');
        // const token = decryptToken(encryptedToken);

        if (!storeId) {
          throw new Error("Store ID not found");
        }
        // if (!token) {
        //   throw new Error("JWT Token is missing or invalid");
        // }

        // Fetch products using the decrypted storeId and token
        const productsData = await fetchProductsByStoreId(storeId);
        setProducts(productsData); // Assume the response contains an array of products
      } catch (error) {
        setError(error.message || 'Failed to fetch products');
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <h2 className="text-2xl font-bold mb-8">All Products</h2>

      {/* Display loading spinner or message */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="loader"></div> {/* Replace with your own spinner if available */}
          <p>Loading products...</p>
        </div>
      )}

      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* If there are no products and no error */}
      {!loading && products.length === 0 && !error && (
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
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td> {/* Ensure price formatting */}
                <td className="py-2 px-4 border-b">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={`Image of ${product.name}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <p className="text-gray-500">No image available</p>
                  )}
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
