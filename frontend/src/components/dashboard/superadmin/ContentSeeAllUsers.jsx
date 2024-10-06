import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

const ContentSeeAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/superadmin/users'); // Adjust API endpoint as needed
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8 w-full ">
      <h2 className="text-2xl font-bold mb-8">All Users</h2>
      {error && <p className="text-red-500">{error}</p>}
      {users.length === 0 ? <p>No users available.</p> : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContentSeeAllUsers;
