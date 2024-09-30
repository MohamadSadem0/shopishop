import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption
import { fetchCategoriesByStoreId, addProduct } from '../../../services/productService'; // Import the service functions
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
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper function to decrypt the encrypted sessionStorage data
  const decryptData = (encryptedData) => {
    if (!encryptedData || !encryptionKey) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  // Retrieve and decrypt the store data from sessionStorage
  const encryptedStore = sessionStorage.getItem('store');
  const store = encryptedStore ? decryptData(encryptedStore) : null;
  const storeId = store?.id;

  // Fetch categories based on the store's section
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await fetchCategoriesByStoreId(storeId);
        setCategories(fetchedCategories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchCategories();
    }
  }, [storeId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Log the input field's name and value
    console.log(`Field Name: ${name}, Field Value: ${value}`);
    
    // Log the state before updating
    console.log('Before update:', product);
  
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  
    // Log the state after the update
    setTimeout(() => {
      console.log('After update:', product);
    }, 100);  // Use a timeout to allow the state to update asynchronously
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...product,
        price: parseFloat(product.price),
        storeId: storeId,
        categoryId: product.categoryId
      };

      await addProduct(payload);

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
    name="name" // Set the name attribute
    value={product.name}
    onChange={handleChange}
    placeholder="Enter the product name"
    required
  />

  <Input
    label="Product Description"
    name="description" // Set the name attribute
    value={product.description}
    onChange={handleChange}
    placeholder="Enter product description"
    required
  />

  <Input
    label="Price"
    name="price" // Set the name attribute
    value={product.price}
    onChange={handleChange}
    placeholder="Enter product price"
    type="number"
    required
  />

  <Input
    label="Image URL"
    name="imageUrl" // Set the name attribute
    value={product.imageUrl}
    onChange={handleChange}
    placeholder="Enter image URL"
    type="url"
  />

  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
    <select
      name="categoryId" // Set the name attribute
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
