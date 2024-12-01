import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess as loginAction } from '../redux/authSlice';
import { signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (userDetails) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await signup(userDetails);
      if (response && response.message === 'User registered successfully') {
        setSuccess(true);
        dispatch(loginAction({ user: response.userId }));

        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setError('The email is already in use. Please try another one.');
        } else if (err.response.status >= 400 && err.response.status < 500) {
          setError('Failed to sign up. Please check your details.');
        } else if (err.response.status >= 500) {
          setError('Server error. Please try again later.');
        }
      } else {
        setError('Failed to sign up. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading, error, success };
};
