import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption
import { fetchCategoriesByStoreId, addProduct } from '../../../services/fetchingService'; // Import the service functions
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input'; // Use the new Input component
import Spinner from '../../../components/common/Spinner';

// Your encryption key from environment variables
const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

const ContentAddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '',
    storeId:""
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper function to decrypt the encrypted data
  const decryptData = (encryptedData) => {
    if (!encryptedData || !encryptionKey) {
      console.error("No encrypted data or encryption key available");
      return null;
    }
    
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      
      return decryptedData;
    } catch (error) {
      console.error("Decryption failed", error);
      return null;
    }
  };

  // Retrieve and decrypt the store data from sessionStorage
  const encryptedStore = sessionStorage.getItem('store');
  const store = encryptedStore ? decryptData(encryptedStore) : null;
  const storeId = store?.id;

  // Retrieve and decrypt the JWT token from sessionStorage (or localStorage)
  const encryptedToken = sessionStorage.getItem('authToken'); // Change this to localStorage if needed
  const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey).toString(CryptoJS.enc.Utf8);




  // Fetch categories based on the store's section
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error("JWT Token is missing or invalid");
        }
        
        const fetchedCategories = await fetchCategoriesByStoreId(storeId, token); // Pass decrypted token here

        setCategories(fetchedCategories);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching categories:", error); // Add more detailed error logging
      } finally {
        setLoading(false);
      }
    };

    if (storeId && token) {
      
      fetchCategories();
    }
  }, [storeId, token]); // Add token to dependencies

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  try {
    if (!token) {
      throw new Error("JWT Token is missing or invalid");
    }

    const payload = {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      storeId: storeId // Include the storeId in the payload
    };

    await addProduct(payload, product.categoryId, token); // Pass categoryId as a separate argument

    setSuccess('Product added successfully!');
    // Reset the form on success
    setProduct({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      categoryId: ''
    });
  } catch (error) {
    setError(error.message);
    console.error("Error adding product:", error); 
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-8 w-full bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Add New Product</h2>

      {loading && <Spinner />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter the product name"
          required
        />

        <Input
          label="Product Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter product description"
          required
        />

        <Input
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter product price"
          type="number"
          required
        />

        <Input
          label="Image URL"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Enter image URL"
          type="url"
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
  name="categoryId"
  value={product.categoryId}
  onChange={handleChange}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
  required
>
  <option value="">Select a Category</option>
  {categories.length > 0
    ? categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))
    : <option disabled>No categories available</option>}
</select>

        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <Button
          type="submit"
          label={loading ? 'Submitting...' : 'Add Product'}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default ContentAddProduct;
