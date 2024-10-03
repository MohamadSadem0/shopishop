import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import websocketService from './services/websocketService'; 
import Login from './pages/auth/login/Login';
import { io } from 'socket.io-client';

import Signup from './pages/auth/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';
import Dashboardpage from './pages/dashboard/Dashboardpage';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption


const App = () => {
    const notifications = useSelector((state) => state.notifications.notifications);
    const [userRole, setUserRole] = useState(null); // State to store decrypted user role

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
        console.log("Decrypted Role: " + decryptedRole); // Log the decrypted role

        // Only connect to WebSocket if the user is a superadmin
        if (decryptedRole === 'superadmin') {
            websocketService.connectWebSocket();
        }

        // Cleanup WebSocket connection on unmount
        return () => {
            websocketService.disconnectWebSocket();
        };
    }, []);  // Runs once on component mount

    useEffect(() => {
        if (userRole === 'superadmin' && notifications.length > 0) {
            const latestNotification = notifications[notifications.length - 1];
            console.log('Displaying notification:', latestNotification);

            // Show toast notification for the latest message
            toast.info(`New Notification: ${latestNotification}`, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    }, [notifications, userRole]);  // Only runs when notifications or userRole changes

    return (
        <>
            {/* Tailwind-based notification for multiple messages */}
            <div className="fixed top-5 right-5 space-y-2 z-50">
                {visibleNotifications.map((notification, index) => (
                    <div
                        key={index}
                        className="bg-blue-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500"
                    >
                        <p>{notification}</p>
                    </div>
                ))}
            </div>

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
                </Routes>
            </Router>

            {/* Toast Notification Container */}
            <ToastContainer />
        </>
    );
};

export default App;