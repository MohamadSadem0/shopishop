import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

const ContentSeeAllStores = () => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axiosInstance.get('/superadmin/stores'); // Adjust API endpoint
        setStores(response.data);
      } catch (error) {
        setError('Failed to fetch stores');
      }
    };

    fetchStores();
  }, []);

  const approveStore = async (storeId) => {
    try {
      await axiosInstance.post(`/superadmin/stores/${storeId}/approve`);
      // Re-fetch the stores after approval
      setStores((prevStores) => prevStores.filter(store => store.id !== storeId));
    } catch (error) {
      console.error('Failed to approve store', error);
    }
  };

  return (
    <div className="p-8 w-full bg-gray-100">
      <h2 className="text-2xl font-bold mb-8">All Stores</h2>
      {error && <p className="text-red-500">{error}</p>}
      {stores.length === 0 ? <p>No stores available.</p> : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Store Name</th>
              <th className="py-2 px-4 border-b">Owner</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td className="py-2 px-4 border-b">{store.name}</td>
                <td className="py-2 px-4 border-b">{store.owner.username}</td>
                <td className="py-2 px-4 border-b">{store.approved ? 'Approved' : 'Pending'}</td>
                <td className="py-2 px-4 border-b">
                  {!store.approved && (
                    <button
                      onClick={() => approveStore(store.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>
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

export default ContentSeeAllStores;
