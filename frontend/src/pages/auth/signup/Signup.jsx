import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks from Redux
import { loginSuccess  as loginAction } from '../../../redux/authSlice';
import { fetchSections } from '../../../redux/serviceSectionsSlice'; // Import the thunk for fetching sections
import RoleSelection from './RoleSelection';
import CommonDetails from './CommonDetails';
import MerchantDetails from './MerchantDetails';
import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
import Button from '../../../components/common/Button';
// import { signup } from '../../../services/authService';
import { signup } from '../../../services/authService';
import logo from '../../../assets/icons/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('Customer');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceSection, setServiceSection] = useState(''); 
  const [location, setLocation] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access sections and loading state from Redux store
  const { sections, loading } = useSelector((state) => state.serviceSections);

  useEffect(() => {
    if (userType === 'Merchant' && currentStep === 3 && sections.length === 0) {
      dispatch(fetchSections()); // Fetch sections only if not already in Redux store
    }
  }, [userType, currentStep, sections.length, dispatch]);

  const handleNext = () => {
    if (currentStep === 1 && (userType === 'Customer' || userType === 'Merchant')) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const userPayload = {
        name: username,
        password,
        email,
        role: userType === "Customer" ? "CUSTOMER" : "Merchant",
        ...(userType === "Merchant" && { serviceName, serviceSection, location, currency })
      };
  
      const response = await signup(userPayload);
  
      if (response && response.message === "User registered successfully") {
        dispatch(loginAction({ user: response.userId }));
        navigate("/login", { state: { message: "Signup successful" } });
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("User with this email already exists.");
      } else {
        setError("Failed to sign up. Please try again.");
      }
    }
  };
  

  const handleBackToWebsite = () => {
    navigate('/');
  };

  return (
    <div id="signup" className="min-h-screen flex items-center justify-center relative bg-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Scrollable Content */}
      <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-6 sm:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img className="w-20 sm:w-24" src={logo} alt="Logo" />
        </div>

        {/* Conditional Step Rendering */}
        {currentStep === 1 && <RoleSelection userType={userType} setUserType={setUserType} handleNext={handleNext} />}
        {currentStep === 2 && (
          <CommonDetails
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSignup={handleSignup}
            userType={userType}
          />
        )}
        {currentStep === 3 && userType === 'Merchant' && (
          <MerchantDetails
            serviceName={serviceName}
            setServiceName={setServiceName}
            serviceSection={serviceSection}
            setServiceSection={setServiceSection}
            location={location}
            setLocation={setLocation}
            currency={currency}
            setCurrency={setCurrency}
            sections={sections}
            loading={loading}
            error={error}
            handleSignup={handleSignup}
            handleBack={handleBack}
          />
        )}

        {/* Google Sign-In Button */}
        <div className="flex mt-4 w-full">
          <GoogleSignInButton />
        </div>

        {currentStep < 3 && (
          <p className="mt-6 text-center text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        )}

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

export default Signup;
