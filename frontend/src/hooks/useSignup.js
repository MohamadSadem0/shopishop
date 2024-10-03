// src/hooks/useSignup.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import { loginSuccess } from '../redux/authSlice';

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (values, setLoading, setError) => {
    setLoading(true);
    setError('');

    try {
      const response = await signup(values);
      const { token, email, username, role, phoneNumber, location, store } = response.data;

      dispatch(loginSuccess({ user: { email, username, role, phoneNumber, location, store }, token }));

      if (role === 'merchant') {
        navigate('/merchant-dashboard');
      } else {
        navigate('/profile');
      }

      window.location.reload();
    } catch (err) {
      console.error('Signup error:', err.response || err.message);
      setError('Signup failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup };
};
