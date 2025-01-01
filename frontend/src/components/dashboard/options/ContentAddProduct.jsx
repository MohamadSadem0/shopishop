import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesByStoreId } from '../../../redux/slices/categorySlice';
import { getDecryptedItem } from '../../../utils/decryptToken';
import AddProductForm from '../forms/AddProductForm';

const ContentAddProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.storeCategories);
  const status = useSelector((state) => state.categories.storeCategoriesStatus);
  const error = useSelector((state) => state.categories.storeCategoriesError);

  useEffect(() => {
    const storeId = getDecryptedItem('storeId');
    if (storeId) {
      dispatch(fetchCategoriesByStoreId({ storeId }));
    } else {
      console.error('Store ID not found in sessionStorage');
    }
  }, [dispatch]);

  return (
    <div className="p-8 w-full bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Add New Product</h2>
      <AddProductForm categories={categories} status={status} error={error} />
    </div>
  );
};

export default ContentAddProduct;
