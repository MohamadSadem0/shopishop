

import React, { useState, useEffect } from 'react';
import { useSignup } from '../../../hooks/useSignup';
import RoleSelection from './RoleSelection';
import CommonDetails from './CommonDetails';
import LocationDetails from './LocationDetails';
import MerchantDetails from './MerchantDetails';
import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
import SignupStatus from '../../../components/common/SignupStatus';
import Button from '../../../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';
import {fetchSectionsAPI} from "../../../services/fetchingService";

const Signup = () => {
  const { handleSignup, loading, error, success } = useSignup();
  const navigate = useNavigate(); 

  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('Customer');
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    latitude: 40.712776,
    longitude: -74.005974,
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    serviceName: '',
    serviceSection: '',
    currency: 'USD',
  });
  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(false);

  useEffect(() => {
    if (userType === 'Merchant' && currentStep === 4) {
      setLoadingSections(true);
      fetchSectionsAPI()
        .then((data) => setSections(data))
        .catch(() => console.error('Failed to fetch sections'))
        .finally(() => setLoadingSections(false));
      console.log(sections);
      
    }
  }, [userType, currentStep]);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handleBackStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    const payload = {
      name: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
      role: userType === 'Merchant' ? 'MERCHANT' : 'CUSTOMER',
      latitude: userDetails.latitude,
      longitude: userDetails.longitude,
      addressLine: userDetails.addressLine,
      city: userDetails.city,
      state: userDetails.state,
      zipCode: userDetails.zipCode,
      country: userDetails.country,
      currency: userDetails.currency,
      ...(userType === 'Merchant' && {
        sectionId: userDetails.sectionId || '01ed7cfb-e1d6-4c16-b8b5-b22e753c51a1',
        businessName: userDetails.businessName,
      }),
    };
  
    handleSignup(payload);
  };
  
  return (
    <div id="signup" className="min-h-screen flex items-center justify-center relative bg-white">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-6 sm:p-10">
        <div className="flex justify-center mb-6">
          <img className="w-20 sm:w-24" src={logo} alt="Logo" />
        </div>

        {currentStep === 1 && (
          <RoleSelection userType={userType} setUserType={setUserType} handleNext={handleNextStep} />
        )}
        {currentStep === 2 && (
          <CommonDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            handleNext={handleNextStep}
            handleBack={handleBackStep}
          />
        )}
        {currentStep === 3 && (
          <LocationDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            handleNext={userType === 'Merchant' ? handleNextStep : null}
            handleSignup={userType === 'Customer' ? onSubmit : null}
            handleBack={handleBackStep}
            userType={userType}
          />
        )}
        {currentStep === 4 && userType === 'Merchant' && (
          <MerchantDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            sections={sections}
            loading={loadingSections}
            handleSignup={onSubmit}
          />
        )}

        <SignupStatus loading={loading} error={error} success={success} />
        
        <div className="flex mt-4 w-full">
          {/* <GoogleSignInButton /> */}
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            label="Go Back to Website"
            onClick={() => navigate('/home')}
            className="w-full bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
