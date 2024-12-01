import React, { useState, useEffect } from 'react';
import { fetchAllUsers, fetchUserDetailsByEmail } from '../../../services/fetchingService'; // Adjust path as necessary
import UserCard from '../cards/UserCard'; // Adjust path as necessary
import UserDetailPopup from '../forms/UserDetailPopup'; // Adjust path as necessary

const ContentSeeAllUsers = ({ searchQuery }) => { // Add searchQuery prop
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState(''); // Store role filter (e.g., 'CUSTOMER', 'MERCHANT')
  const [storeFilter, setStoreFilter] = useState(''); // Store status filter (e.g., 'approved', 'pending')
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // Tracks selected user
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  // Fetch users when component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers); // Initialize filteredUsers with all users
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Fetch users error:', error);
      }
    };

    loadUsers();
  }, []);

  // Filter logic based on role, store approval status, and search query
  const applyFilters = () => {
    let filtered = [...users];

    // Filter based on user role
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // If role is 'MERCHANT', filter based on store approval status
    if (roleFilter === 'MERCHANT' && storeFilter) {
      filtered = filtered.filter(user => {
        if (user.store) {
          return storeFilter === 'approved' ? user.store.approved : !user.store.approved;
        }
        return false;
      });
    }

    // Search filter by user name and email
    const searchQueryLower = searchQuery.toLowerCase();
    filtered = filtered.filter(user => {
      const userName = user.userName || ''; // Ensure no undefined errors
      const email = user.email || '';
      return userName.toLowerCase().includes(searchQueryLower) || email.toLowerCase().includes(searchQueryLower);
    });

    setFilteredUsers(filtered);
  };

  // Apply filters whenever the role, store filter, or users array changes
  useEffect(() => {
    applyFilters();
  }, [roleFilter, storeFilter, users, searchQuery]);

  // Function to handle user click, fetch details by email, and open modal
  const handleUserClick = async (email) => {
    try {
      const userDetails = await fetchUserDetailsByEmail(email); // Fetch user by email
      setSelectedUser(userDetails); // Set the user details to state
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Unable to fetch user details');
    }
  };

  return (
    <div className="p-8 w-full">
      <h2 className="text-2xl font-bold mb-8">All Users</h2>

      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Filter section */}
      <div className="mb-6">
        <select
          className="border p-2 rounded mr-4"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="CUSTOMER">Customer</option>
          <option value="MERCHANT">Merchant</option>
        </select>

        {roleFilter === 'MERCHANT' && (
          <select
            className="border p-2 rounded"
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
          >
            <option value="">All Stores</option>
            <option value="approved">Approved Stores</option>
            <option value="pending">Pending Stores</option>
          </select>
        )}
      </div>

      {/* Display filtered users */}
      {filteredUsers.length === 0 ? <p>No users match your criteria.</p> : (
        <div className="flex flex-wrap">
          {filteredUsers.map(user => (
            <UserCard
              key={user.email} // Use email as the key
              user={user}
              onClick={() => handleUserClick(user.email)} // Pass email to fetch details
            />
          ))}
        </div>
      )}

      {/* Modal to show user details */}
      {showModal && selectedUser && (
        <UserDetailPopup
          user={selectedUser} // Pass the selected user to the modal
          onClose={() => setShowModal(false)} // Close modal function
        />
      )}
    </div>
  );
};

export default ContentSeeAllUsers;
