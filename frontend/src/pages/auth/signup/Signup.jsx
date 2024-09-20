import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../../redux/authSlice';
import RoleSelection from './RoleSelection';
import CommonDetails from './CommonDetails';
import SellerDetails from './SellerDetails';
import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
import Button from '../../../components/common/Button';
import { signup, fetchServiceCategories } from '../../../services/authService';
import logo from '../../../assets/icons/logo.svg';
import backgroundImage from '../../../assets/images/loginBackground.png';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('Customer');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceSection, setServiceSection] = useState(''); // Changed from serviceCategory to serviceSection
  const [location, setLocation] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [sections, setSections] = useState([]); // Changed from categories to sections
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (userType === 'Seller' && currentStep === 3) {
      fetchServiceCategories().then(setSections); // Changed categories to sections
    }
  }, [userType, currentStep]);

  const handleNext = () => {
    if (currentStep === 1 && (userType === 'Customer' || userType === 'Seller')) {
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
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
    }

    try {
        // Creating the payload for the signup request
        const userPayload = {
            name: username,
            password: password,
            email: email,
            role: userType === 'Customer' ? 'CUSTOMER' : 'SELLER',  // Set role based on user type
            ...(userType === 'Seller' && {
                serviceName,
                serviceSection,
                location,
                currency,
            })
        };

        // Sending the signup request
        const user = await signup(userPayload);
        console.log(user);
        dispatch(loginAction({ user }));

        // Redirect to login page with success message
        navigate('/login', { state: { message: 'Signup successful' } });

    } catch (err) {
        setError('Failed to sign up. Please try again.');
    } finally {
        setLoading(false);
    }
};


  const handleBackToWebsite = () => {
    navigate('/');
  };

  return (
    <div
      id="signup"
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
        {currentStep === 3 && userType === 'Seller' && (
          <SellerDetails
            serviceName={serviceName}
            setServiceName={setServiceName}
            serviceSection={serviceSection} // Changed category to section
            setServiceSection={setServiceSection} // Changed setServiceCategory to setServiceSection
            location={location}
            setLocation={setLocation}
            currency={currency}
            setCurrency={setCurrency}
            sections={sections} // Changed categories to sections
            error={error}
            handleSignup={handleSignup}
            handleBack={handleBack}
            loading={loading}
          />
        )}

        {/* Google Sign-In Button */}
        <div className="flex mt-4 w-full">
          <GoogleSignInButton />
        </div>

        {currentStep < 3 && (
          <p className="mt-6 text-center text-gray-700">
            Already have an account?{" "}
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
