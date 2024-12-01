import React from 'react';
import { useForm } from '../../../hooks/useForm';
import { useAuth } from '../../../hooks/useAuth';
import Spinner from '../../../components/common/Spinner';
import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { Link } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate =useNavigate();
  const { values, handleChange, loading, error, setLoading, setError } = useForm({
    email: '',
    password: '',
  });
  const { handleLogin } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(values, setError, setLoading);
  };

  return (
    <div id="login" className="min-h-screen flex items-center justify-center relative bg-white">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-6 sm:p-10">
        <div className="flex justify-center mb-6">
          <img className="w-20 sm:w-24" src={logo} alt="Logo" />
        </div>

        <h1 className="text-black text-3xl sm:text-4xl font-bold mb-4 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-6">Please enter your account details.</p>

        <form onSubmit={onSubmit} className="flex flex-col w-full">
          <Input
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="mb-4 w-full"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="mb-4 w-full"
            required
          />

          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <Button
            label={loading ? <Spinner /> : "Sign in"}
            type="submit"
            className="w-full bg-yellow1 text-black text-lg py-2 rounded hover:bg-yellow1 transition"
          />
        </form>

        <div className="flex mt-4 w-full">
          {/* <GoogleSignInButton /> */}
        </div>

        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>

        <div className="mt-4 flex justify-center">
          <Button
            label="Go Back to Website"
            onClick={() => navigate("/")}
            className="w-full bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
