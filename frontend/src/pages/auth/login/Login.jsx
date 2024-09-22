import React, { useState } from "react";
import { login } from "../../../services/authService";
import Spinner from "../../../components/common/Spinner";
import GoogleSignInButton from "../../../components/common/GoogleSignInButton";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";
import CryptoJS from "crypto-js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login({ email, password });

      // Extract data from the response
      const { token, email: userEmail, userName, role, phoneNumber, location } = response.data;
      console.log({ response });

      // Ensure the encryption key is loaded correctly
      console.log("Encryption Key:", encryptionKey);

      // Encrypt the token and user details if the encryption key is valid
      if (encryptionKey) {
        const encryptedToken = CryptoJS.AES.encrypt(token, encryptionKey).toString();
        const encryptedUserEmail = CryptoJS.AES.encrypt(userEmail, encryptionKey).toString();
        const encryptedUserName = CryptoJS.AES.encrypt(userName, encryptionKey).toString();
        const encryptedUserRole = CryptoJS.AES.encrypt(role, encryptionKey).toString();
        const encryptedPhoneNumber = CryptoJS.AES.encrypt(phoneNumber, encryptionKey).toString();

        // Optionally encrypt location details
        const encryptedLocation = location
          ? CryptoJS.AES.encrypt(JSON.stringify(location), encryptionKey).toString()
          : null;

        // Store encrypted data in localStorage
        localStorage.setItem("authToken", encryptedToken);
        localStorage.setItem("userEmail", encryptedUserEmail);
        localStorage.setItem("userName", encryptedUserName);
        localStorage.setItem("userRole", encryptedUserRole);
        localStorage.setItem("phoneNumber", encryptedPhoneNumber);

        if (encryptedLocation) {
          localStorage.setItem("location", encryptedLocation);
        }
      } else {
        console.error("Encryption key is missing.");
      }

      console.log("Logged in user:", { token, userEmail, userName, role, phoneNumber, location });

      // Redirect to the dashboard or home page
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToWebsite = () => {
    navigate("/");
  };

  return (
    <div
      id="login"
      className="min-h-screen flex items-center justify-center relative bg-white"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Scrollable Content */}
      <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-6 sm:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img className="w-20 sm:w-24" src={logo} alt="Logo" />
        </div>

        {/* Page Content */}
        <h1 className="text-black text-3xl sm:text-4xl font-bold mb-4 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please enter your account details.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col w-full">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full"
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
          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          {/* Sign in Button */}
          <Button
            label={loading ? <Spinner /> : "Sign in"}
            type="submit"
            className="w-full bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500 transition"
          />
        </form>

        {/* Google Sign-In Button */}
        <div className="flex mt-4 w-full">
          <GoogleSignInButton />
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        {/* Go Back to Website Button */}
        <div className="mt-4 flex justify-center">
          <Button
            label="Go Back to Website"
            onClick={handleBackToWebsite}
            className="w-full bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
