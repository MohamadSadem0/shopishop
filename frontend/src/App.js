// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket, disconnectWebSocket } from './redux/actions/notificationActions';
import store from './redux/store';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';
import Dashboardpage from './pages/dashboard/Dashboardpage';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            // Connect to WebSocket when authenticated
            dispatch(connectWebSocket());
        } else {
            // Disconnect from WebSocket when logged out
            dispatch(disconnectWebSocket());
        }

        // Cleanup WebSocket connection on unmount
        return () => {
            dispatch(disconnectWebSocket());
        };
    }, [isAuthenticated, dispatch]);

    return (
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
    );
};

export default App;
