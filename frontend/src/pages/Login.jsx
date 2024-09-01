import React, { useState } from 'react';
import { login } from '../services/authService';
import Spinner from '../components/common/Spinner';
import GoogleSignInButton from '../components/common/GoogleSignInButton';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import logo from '../assets/images/logo.svg'; 
import backgroundImage from '../assets/images/loginBackground.png';
import { Link } from 'react-router-dom';
import "../styles/login.css"

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
    <div className="w-full h-screen relative overflow-hidden flex items-center pl-10 ">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10" 
      />

      {/* Left Aligned Content */}
      <div className="flex flex-col items-start h-full w-full max-w-md p-8">
        {/* Logo */}
        <img
          className="w-[50] max-w-[150px] mb-8"
          src={logo}
          alt="Logo"
        />

        {/* Page Content */}
        <h1 className="text-white text-4xl mb-10 mt-10">Welcome back</h1>
        <p className="text-[#c4c4c4] text-2xl mb-6">Please enter your account details</p>

        <form onSubmit={handleLogin} className="flex flex-col text-white w-full">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full text-white"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full"
            required
          />
          
          {/* Forgot Password Link */}
          <p className=" text-white text-right w-full mb-4">
            <Link to="/forgot-password" className="">Forgot Password?</Link>
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className='flex justify-center'>
            <Button
              label={loading ? <Spinner /> : 'Sign in'}
              type="submit"
              className="w-full bg-[#FEDE02] text-black text-xl py-2 rounded w-2/4 hover:bg-[#FEDE02]"
            />
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div className='flex  mt-4 w-2/4 ml-auto mr-auto'>
          <GoogleSignInButton />
        </div>

        {/* Sign Up Link */}
        <p className="mt-4 text-whit ml-auto mr-auto">
          Don’t have an account? <Link to="/signup" className="text-[#fede02]">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
