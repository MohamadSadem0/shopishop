// src/hooks/useAuth.js
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';
import { login } from '../services/authService';
import { loginSuccess } from '../redux/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

  const handleLogin = async ({ email, password }, setError, setLoading) => {
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      const { token, email: userEmail, userName, role, phoneNumber, location, store } = response.data;

      const normalizedRole = role.toLowerCase();
      if (encryptionKey) {
        // Encrypt and store data in sessionStorage
        const encryptedToken = CryptoJS.AES.encrypt(token, encryptionKey).toString();
        const encryptedUserEmail = CryptoJS.AES.encrypt(userEmail, encryptionKey).toString();
        const encryptedUserName = CryptoJS.AES.encrypt(userName, encryptionKey).toString();
        const encryptedUserRole = CryptoJS.AES.encrypt(normalizedRole, encryptionKey).toString();
        const encryptedPhoneNumber = phoneNumber ? CryptoJS.AES.encrypt(phoneNumber, encryptionKey).toString() : null;
        const encryptedLocation = CryptoJS.AES.encrypt(JSON.stringify(location), encryptionKey).toString();

        sessionStorage.setItem('authToken', encryptedToken);
        sessionStorage.setItem('userEmail', encryptedUserEmail);
        sessionStorage.setItem('userName', encryptedUserName);
        sessionStorage.setItem('userRole', encryptedUserRole);
        sessionStorage.setItem('phoneNumber', encryptedPhoneNumber);
        sessionStorage.setItem('location', encryptedLocation);

        if (normalizedRole === 'merchant' && store) {
          const encryptedStore = CryptoJS.AES.encrypt(JSON.stringify(store), encryptionKey).toString();
          sessionStorage.setItem('store', encryptedStore);
        }
      }

      // Dispatch login success action to Redux
      dispatch(loginSuccess({
        user: { email: userEmail, name: userName, role: normalizedRole, phoneNumber, location, store },
        token,
      }));

      // Navigate based on role
      if (normalizedRole === 'superadmin' || normalizedRole === 'merchant') {
        navigate('/dashboard');
      } else if (normalizedRole === 'customer') {
        navigate('/profile');
      } else {
        navigate('/unauthorized');
      }

      window.location.reload();  // Optional: Refresh after login
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin };
};
