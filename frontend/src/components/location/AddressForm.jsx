import React from 'react';
import Input from '../common/Input';

const AddressForm = ({ userDetails, setUserDetails }) => {
  const handleChange = (field) => (e) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <Input
        label="Address Line"
        value={userDetails.addressLine}
        onChange={handleChange('addressLine')}
        required
        className="mb-4"
      />
      <Input
        label="City"
        value={userDetails.city}
        onChange={handleChange('city')}
        required
        className="mb-4"
      />
      <Input
        label="State"
        value={userDetails.state}
        onChange={handleChange('state')}
        required
        className="mb-4"
      />
      <Input
        label="Zip Code"
        value={userDetails.zipCode}
        onChange={handleChange('zipCode')}
        required
        className="mb-4"
      />
      <Input
        label="Country"
        value={userDetails.country}
        onChange={handleChange('country')}
        required
        className="mb-4"
      />
    </div>
  );
};

export default AddressForm;
