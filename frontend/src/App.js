import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import websocketService from './services/websocketService';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';
import Dashboardpage from './pages/dashboard/Dashboardpage';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AllStoresPage from './pages/store/AllStoresPage'; // Import the AllStoresPage
import StorePage from './pages/store/StorePage'; // Import the StorePage
import ProductDetailsPage from './pages/store/ProductDetailsPage'; // Import ProductDetailsPage
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption
import NotificationPopup from './components/admin/NotificationPopup'; // Import reusable notification component
import StoreDetailsPage from './pages/store/StoreDetailsPage';

const App = () => {
    const notifications = useSelector((state) => state.notifications.notifications);
    const [userRole, setUserRole] = useState(null); // State to store decrypted user role
    const [visibleNotifications, setVisibleNotifications] = useState([]); // State to handle multiple notifications

    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY; // Encryption key

    // Decrypt user role from sessionStorage
    const decryptRole = (encryptedRole) => {
        if (!encryptedRole || !encryptionKey) return null;
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedRole, encryptionKey);
            return bytes.toString(CryptoJS.enc.Utf8); // Decrypted role as plain text
        } catch (error) {
            console.error("Error decrypting role:", error);
            return null;
        }
    };

    useEffect(() => {
        // Get encrypted role from sessionStorage and decrypt it
        const encryptedRole = sessionStorage.getItem('userRole'); // Assuming the role is encrypted in sessionStorage
        const decryptedRole = decryptRole(encryptedRole); // Decrypt the role
        setUserRole(decryptedRole); // Set the decrypted role

        // Only connect to WebSocket if the user is a superadmin
        if (decryptedRole === 'superadmin') {
            websocketService.connectWebSocket();  // Connect WebSocket without passing handlers
        }

        // Cleanup WebSocket connection on unmount
        return () => {
            websocketService.disconnectWebSocket();
        };
    }, []);  // Runs once on component mount

    // Watch for new notifications in Redux and add them to the visible notifications
    useEffect(() => {
        if (notifications.length > 0) {
            const latestNotification = notifications[notifications.length - 1];

            // Add the new notification to the visible list
            setVisibleNotifications((prevNotifications) => [...prevNotifications, latestNotification]);

            // Remove the notification after 5 seconds
            setTimeout(() => {
                setVisibleNotifications((prevNotifications) =>
                    prevNotifications.filter((n) => n !== latestNotification)
                );
            }, 5000);  // Remove after 5 seconds
        }
    }, [notifications]);

    return (
        <>
            {/* Render Notification Popups */}
            <NotificationPopup notifications={visibleNotifications} />

            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/dashboard"
                        element={<ProtectedRoute allowedRoles={['superadmin', 'merchant']} component={Dashboardpage} />}
                    />
                    <Route
                        path="/profile"
                        element={<ProtectedRoute allowedRoles={['customer']} component={Profile} />}
                    />
                    <Route path="/stores" element={<AllStoresPage />} /> {/* Add AllStoresPage route */}
                    <Route path="/store/:storeId" element={<StoreDetailsPage />} /> {/* Add route for store details */}
                    <Route path="/product/:productId" element={<ProductDetailsPage />} /> {/* Add ProductDetailsPage route */}
                </Routes>
            </Router>
        </>
    );
};

export default App;
