import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../../redux/authSlice';
import RoleSelection from './RoleSelection';
import CommonDetails from './CommonDetails';
import SellerDetails from './SellerDetails';
import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
import { signup, fetchServiceCategories } from '../../../services/authService';
import backgroundImage from '../../../assets/images/loginBackground.png';
import logo from '../../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('Customer');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [location, setLocation] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (userType === 'Seller' && currentStep === 3) {
      fetchServiceCategories().then(setCategories);
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
      const user = await signup({ username, email, password, userType, serviceName, serviceCategory, location, currency });
      dispatch(loginAction({ user }));

      // Redirect to login page with success message
      navigate('/login', { state: { message: 'Signup successful' } });

    } catch (err) {
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden flex pl-10">
      <img src={backgroundImage} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover -z-10" />
      <div className="flex flex-col items-start h-full w-full max-w-lg">
        <img src={logo} alt="Logo" className="w-36 h-36 mb-8" />

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
            userType={userType}
          />
        )}
        {currentStep === 3 && userType === 'Seller' && (
          <SellerDetails
            serviceName={serviceName}
            setServiceName={setServiceName}
            serviceCategory={serviceCategory}
            setServiceCategory={setServiceCategory}
            location={location}
            setLocation={setLocation}
            currency={currency}
            setCurrency={setCurrency}
            categories={categories}
            error={error}
            handleSignup={handleSignup}
            handleBack={handleBack}
            loading={loading}
          />
        )}

        {currentStep === 2 && (
          <div className="flex mt-4 w-2/4 ml-auto mr-auto">
            <GoogleSignInButton />
          </div>
        )}

        {currentStep < 3 && (
          <p className="mt-4 text-center text-white">
            Already have an account? <Link to="/login" className="text-[#fede02]">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;