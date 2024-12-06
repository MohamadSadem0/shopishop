import React, { useEffect, useState } from 'react';
import {
  fetchAllUsersAPI,
  fetchUserDetailsByEmailAPI,
} from '../../../services/fetchingService';
import UserCard from '../cards/UserCard';
import UserDetailPopup from '../forms/UserDetailPopup';

const ContentSeeAllUsers = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [storeFilter, setStoreFilter] = useState('');
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsersAPI();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Fetch users error:', error);
      }
    };

    loadUsers();
  }, []);

  const applyFilters = () => {
    let filtered = [...users];

    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (roleFilter === 'MERCHANT' && storeFilter) {
      filtered = filtered.filter((user) =>
        user.store
          ? storeFilter === 'approved'
            ? user.store.approved
            : !user.store.approved
          : false
      );
    }

    const searchQueryLower = searchQuery.toLowerCase();
    filtered = filtered.filter((user) => {
      const userName = user.userName || '';
      const email = user.email || '';
      return (
        userName.toLowerCase().includes(searchQueryLower) ||
        email.toLowerCase().includes(searchQueryLower)
      );
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [roleFilter, storeFilter, users, searchQuery]);

  const handleUserClick = async (email) => {
    try {
      const userDetails = await fetchUserDetailsByEmailAPI(email);
      setSelectedUser(userDetails);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Unable to fetch user details');
    }
  };

  return (
    <div className="p-4 w-full bg-color3">
      <div className="mb-4 flex flex-row justify-between items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Users</h2>
        </div>

        <div className="flex flex-col gap-2">
          <select
            className="px-4 py-2 border rounded"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="CUSTOMER">Customer</option>
            <option value="MERCHANT">Merchant</option>
          </select>

          {roleFilter === 'MERCHANT' && (
            <select
              className="px-4 py-2 border rounded"
              value={storeFilter}
              onChange={(e) => setStoreFilter(e.target.value)}
            >
              <option value="">All Stores</option>
              <option value="approved">Approved Stores</option>
              <option value="pending">Pending Stores</option>
            </select>
          )}
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full flex flex-wrap items-center justify-between mt-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.email}
              user={user}
              onClick={() => handleUserClick(user.email)}
            />
          ))
        ) : (
          <p className="mt-4 text-gray-600 w-full text-center">
            No users match the selected criteria.
          </p>
        )}
      </div>

      {showModal && selectedUser && (
        <UserDetailPopup
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ContentSeeAllUsers;
