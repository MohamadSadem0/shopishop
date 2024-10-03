import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStoreById } from '../../services/fetchingService';

const StoreDetailsPage = () => {
  const { storeId } = useParams(); // Get storeId from route params
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const storeData = await fetchStoreById(storeId);
        setStore(storeData);
      } catch (error) {
        setError('Failed to load store data');
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [storeId]);

  if (loading) return <div>Loading store details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{store.name}</h1>
      <p className="text-lg mb-4">Owner: {store.ownerName}</p>
      <p className={`font-semibold ${store.approved ? 'text-green-600' : 'text-red-600'}`}>
        {store.approved ? 'Approved' : 'Not Approved'}
      </p>
      <p className="text-gray-600 mt-4">{store.description || 'No description available'}</p>

      {/* Add more details about the store as needed */}
    </div>
  );
};

export default StoreDetailsPage;
