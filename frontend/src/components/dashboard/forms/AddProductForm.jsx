import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewProduct } from '../../../redux/slices/productSlice';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import Spinner from '../../../components/common/Spinner';
import { getDecryptedItem } from '../../../utils/decryptToken';

const AddProductForm = ({ categories, status, error }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '',
    isAvailable: true, // Default to available
  });

  const dispatch = useDispatch();

  // Retrieve storeId from sessionStorage (or replace with actual logic to get storeId)
  const storeId = getDecryptedItem('storeId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.categoryId) {
      alert('Please select a category');
      return;
    }

    if (!storeId) {
      alert('Store ID is missing.');
      return;
    }

    const productData = { ...product, storeId }; // Include storeId in the payload
    dispatch(createNewProduct(productData));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === 'loading' && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}

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
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isAvailable"
          checked={product.isAvailable}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label className="text-gray-700 text-sm">Available</label>
      </div>

      <Button type="submit" label="Add Product" />
    </form>
  );
};

export default AddProductForm;
