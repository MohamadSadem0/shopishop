// import React from 'react';
// import Input from '../../../components/common/Input';
// import Button from '../../../components/common/Button';

// const MerchantDetails = ({
//   serviceName,
//   setServiceName,
//   serviceSection,
//   setServiceSection,
//   currency,
//   setCurrency,
//   sections = [], // Default to an empty array to avoid undefined errors
//   loading,
//   handleSignup,
//   error,
// }) => (
//   <form onSubmit={handleSignup} className="flex flex-col w-full mt-6">
//     <h1 className="text-black text-3xl font-bold mb-4 text-center">Enter Business Details</h1>
//     <Input
//       label="Business Name"
//       value={serviceName}
//       onChange={(e) => setServiceName(e.target.value)}
//       required
//       className="mb-4 w-full"
//     />
    
//     <div className="mb-4 w-full">
//       <label className="block text-black mb-2">Select Section</label>
//       {loading ? (
//         <p>Loading sections...</p>
//       ) : (
//         <select
//           className="w-full p-2 border rounded"
//           value={serviceSection}
//           onChange={(e) => setServiceSection(e.target.value)} // Get the selected section's ID
//           required
//         >
//           <option value="">Choose a Section</option>
//           {sections.length > 0 ? (
//             sections.map((section) => (
//               <option key={section.id} value={section.id}>
//                 {section.name}
//               </option>
//             ))
//           ) : (
//             <option disabled>No sections available</option>
//           )}
//         </select>
//       )}
//     </div>
    
//     <div className="mb-4 w-full">
//       <label className="block text-black mb-2">Currency</label>
//       <select
//         className="w-full p-2 border rounded"
//         value={currency}
//         onChange={(e) => setCurrency(e.target.value)}
//         required
//       >
//         <option value="USD">USD ($)</option>
//         <option value="LBP">LBP (ل.ل)</option>
//       </select>
//     </div>

//     {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    
//     <Button
//       label="Signup"
//       type="submit"
//       className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500 transition"
//     />
//   </form>
// );

// export default MerchantDetails;
import React from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const MerchantDetails = ({
  userDetails,
  setUserDetails,
  sections = [], // Default to an empty array to avoid undefined errors
  loading,
  handleSignup,
  error,
}) => {
  // Handle change for nested fields in userDetails
  const handleChange = (field) => (e) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col w-full mt-6">
      <h1 className="text-black text-3xl font-bold mb-4 text-center">Enter Business Details</h1>
      
      <Input
        label="Business Name"
        value={userDetails.businessName || ''}
        onChange={handleChange('businessName')}
        required
        className="mb-4 w-full"
      />
      
      <div className="mb-4 w-full">
        <label className="block text-black mb-2">Select Section</label>
        {loading ? (
          <p>Loading sections...</p>
        ) : (
          <select
            className="w-full p-2 border rounded"
            value={userDetails.sectionId || ''}
            onChange={handleChange('sectionId')} // Set the section ID in userDetails
            required
          >
            <option value="">Choose a Section</option>
            {sections.length > 0 ? (
              sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))
            ) : (
              <option disabled>No sections available</option>
            )}
          </select>
        )}
      </div>
      
      <div className="mb-4 w-full">
        <label className="block text-black mb-2">Currency</label>
        <select
          className="w-full p-2 border rounded"
          value={userDetails.currency || 'USD'}
          onChange={handleChange('currency')}
          required
        >
          <option value="USD">USD ($)</option>
          <option value="LBP">LBP (ل.ل)</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <Button
        label="Signup"
        type="submit"
        className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500 transition"
      />
    </form>
  );
};

export default MerchantDetails;
