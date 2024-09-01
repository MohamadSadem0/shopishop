import React, { useState } from 'react';
import { login } from '../services/authService';
import Spinner from '../components/common/Spinner';
import GoogleSignInButton from '../components/common/GoogleSignInButton';
import logo from '../assets/images/logo.svg'; 
import backgroundImage from '../assets/images/loginBackground.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login({ email, password });
      const data = user.data;
      console.log('Logged in user:', data.email);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[1440px] h-[1024px] relative overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10" 
      />

      {/* Logo */}
      <img
        className="w-[150px] h-[150px] left-[51px] top-0 absolute"
        src={logo}
        alt="Logo"
      />

      {/* Page Content */}
      <div className="left-[51px] top-[223px] absolute text-[#c4c4c4] text-2xl font-normal font-['Roboto'] leading-9">
        Please enter your account details
      </div>
      <div className="left-[51px] top-[149px] absolute text-white text-4xl font-normal font-['Roboto'] leading-[54px]">
        Welcome back
      </div>
      {/* Other page elements */}
      {/* ... */}
      <form onSubmit={handleLogin} className="absolute left-[51px] top-[307px]">
        <div className="w-[515px] mb-6">
          <label className="block text-white text-xl font-normal mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-[515px] mb-6">
          <label className="block text-white text-xl font-normal mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-[266px] bg-[#fede02] text-black text-xl py-2 px-4 rounded hover:bg-yellow-400"
        >
          {loading ? <Spinner /> : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default Login;
