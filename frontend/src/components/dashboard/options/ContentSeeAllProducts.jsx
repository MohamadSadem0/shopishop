import React, { useState, useEffect } from 'react';
import { fetchProductsByStoreIdAPI } from '../../../services/fetchingService'; // Import the service function
import {getDecryptedItem} from '../../../utils/decryptToken'; // Import the utility function


const ContentSeeAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading

        // Decrypt the storeId from sessionStorage
        const store = getDecryptedItem('storeId'); // Use utility function to decrypt store
        const storeId = store;
        console.log(storeId);
        

        // Decrypt the JWT token from sessionStorage (if needed in the future)
        const token = getDecryptedItem('authToken'); // Decrypt token using utility (not used currently)

        if (!storeId) {
          throw new Error("Store ID not found");
        }

        // Fetch products using the decrypted storeId (and token, if necessary)
        const productsData = await fetchProductsByStoreIdAPI(storeId);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 w-full bg-color3">
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
