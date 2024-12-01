import React, { useState } from 'react';
import { sendPasswordResetEmail, updateProfileInfo } from '../../../services/adminService'; // Backend service functions
import ClipLoader from 'react-spinners/ClipLoader'; // For loading indicator

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileInfo, setProfileInfo] = useState({
    name: 'Super Admin',
    email: 'admin@example.com',
    phone: '123-456-7890',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
  });

  // Handle input changes in profile form
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await updateProfileInfo(profileInfo);
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send password reset email
  const handlePasswordReset = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await sendPasswordResetEmail(profileInfo.email);
      setSuccess('Password reset email sent successfully.');
    } catch (err) {
      setError('Failed to send password reset email: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Super Admin Settings</h2>
      <div className="tabs flex mb-6">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="tab-content">
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profileInfo.name}
              onChange={handleProfileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profileInfo.email}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
            <small className="text-gray-600">Email cannot be changed</small>
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profileInfo.phone}
              onChange={handleProfileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-actions">
            <button
              onClick={handleSaveProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : 'Save Changes'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="tab-content">
          <h3 className="text-xl font-semibold mb-4">Account Security</h3>
          <button
            onClick={handlePasswordReset}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : 'Send Password Reset Email'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="tab-content">
          <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium">
              <input
                type="checkbox"
                checked={notificationSettings.emailAlerts}
                onChange={() =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    emailAlerts: !prev.emailAlerts,
                  }))
                }
              />
              Email Alerts
            </label>
          </div>
          <div className="form-group mb-4">
            <label className="block text-sm font-medium">
              <input
                type="checkbox"
                checked={notificationSettings.smsAlerts}
                onChange={() =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    smsAlerts: !prev.smsAlerts,
                  }))
                }
              />
              SMS Alerts
            </label>
          </div>
          <div className="form-actions">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              {loading ? <ClipLoader color="#fff" size={20} /> : 'Save Notification Settings'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
