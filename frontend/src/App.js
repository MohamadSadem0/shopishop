import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscribeToNotifications, disconnectSocket, connectSocket } from './services/socketService'; 
import Login from './pages/auth/login/Login';
import { io } from 'socket.io-client';

import Signup from './pages/auth/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';
import Dashboardpage from './pages/dashboard/Dashboardpage';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption


const App = () => {
    const [notifications, setNotifications] = useState([]);

    // Retrieve the encryption key from environment variables
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

    // Function to decrypt the token
    const decryptToken = (encryptedToken) => {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, encryptionKey);  // Use the environment variable as the passphrase
        return bytes.toString(CryptoJS.enc.Utf8);  // Convert the decrypted bytes to a UTF-8 string (the original JWT)
    };

    useEffect(() => {
        // Retrieve the encrypted token from sessionStorage
        const encryptedToken = sessionStorage.getItem('authToken');

        if (encryptedToken) {
            // Decrypt the token
            const decryptedToken = decryptToken(encryptedToken);

            // Establish the WebSocket connection using the decrypted token
            const socket = io("http://localhost:9094", {
                auth: {
                    token: decryptedToken  // Use the decrypted JWT token in the WebSocket handshake
                }
            });

            // Listen for notifications from the server
            socket.on('notification', (message) => {
                setNotifications((prevNotifications) => [...prevNotifications, message]);
                alert(`New merchant login: ${message}`);
            });

            // Clean up the socket connection when the component unmounts
            return () => {
                socket.off('notification');
                socket.disconnect();
            };
        }
    }, [encryptionKey]); 

    return (
        <>
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

            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </>
    );
};

export default App;