import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import websocketService from './services/websocketService';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';
import Dashboardpage from './pages/dashboard/Dashboardpage';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption
import NotificationPopup from './components/admin/NotificationPopup'; // Import reusable notification component
import { useResponsiveDesign } from './hooks/useResponsiveDesign';
import LandingPageMobile from './pages/landingPage/LandingPageMobile';
import Store from './pages/store';

// Utility function for role decryption
const decryptRole = (encryptedRole, encryptionKey) => {
  if (!encryptedRole || !encryptionKey) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedRole, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8); // Decrypted role as plain text
  } catch (error) {
    console.error('Error decrypting role:', error);
    return null;
  }
};

const App = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const [userRole, setUserRole] = useState(null); // State to store decrypted user role
  const [visibleNotifications, setVisibleNotifications] = useState([]); // State to handle multiple notifications

  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY; // Encryption key
  const isMobile = useResponsiveDesign(); // Determine if the device is mobile

  // Decrypt user role from sessionStorage and manage WebSocket connection
  useEffect(() => {
    const encryptedRole = sessionStorage.getItem('userRole');
    const decryptedRole = decryptRole(encryptedRole, encryptionKey); // Decrypt the role
    setUserRole(decryptedRole); // Set the decrypted role

    if (decryptedRole === 'superadmin') {
      try {
        websocketService.connectWebSocket(); // Connect WebSocket without passing handlers
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    }

    // Cleanup WebSocket connection on unmount
    return () => {
      websocketService.disconnectWebSocket();
    };
  }, [encryptionKey]);

  // Watch for new notifications in Redux and add them to the visible notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];

      // Avoid duplicate notifications
      if (!visibleNotifications.includes(latestNotification)) {
        setVisibleNotifications((prevNotifications) => [...prevNotifications, latestNotification]);

        // Remove the notification after 5 seconds
        setTimeout(() => {
          setVisibleNotifications((prevNotifications) =>
            prevNotifications.filter((n) => n !== latestNotification)
          );
        }, 5000); // Remove after 5 seconds
      }
    }
  }, [notifications, visibleNotifications]);

  return (
    <>
      {/* Render Notification Popups */}
      <NotificationPopup notifications={visibleNotifications} />

      <Router>
        <Routes>
          {/* Redirect from root */}
          <Route path="/" element={<Navigate replace to="/home" />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={isMobile ? <LandingPageMobile /> : <LandingPage />}
          />

          {/* Store routes */}
          <Route path="/store" element={<Store />} />
          <Route path="/store/:storename/products" element={<Store />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute allowedRoles={['superadmin', 'merchant']} component={Dashboardpage} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute allowedRoles={['customer']} component={Profile} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
