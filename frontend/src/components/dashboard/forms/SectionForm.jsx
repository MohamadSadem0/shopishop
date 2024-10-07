// // SectionForm.jsx
// import React, { useState } from 'react';

// const SectionForm = ({ initialSection = {}, onSave, onClose }) => {
//   const [section, setSection] = useState(initialSection);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(section);
//   };

//   const handleChange = (field, value) => {
//     setSection(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold">{section.id ? 'Edit Section' : 'Add Section'}</h2>
//         <input
//           type="text"
//           placeholder="Section Name"
//           value={section.name || ''}
//           onChange={(e) => handleChange('name', e.target.value)}
//           className="border p-2 w-full"
//           required
//         />
//         <div className="mt-4 flex justify-end space-x-2">
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
//           <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SectionForm;


import React, { useState } from 'react';
import useCloudinaryUpload from '../../../hooks/useCloudinaryUpload';  // Adjust the path as needed

const SectionForm = ({ initialSection = {}, onSave, onClose }) => {
  const { uploadImage, loading, imageUrl } = useCloudinaryUpload();
  const [section, setSection] = useState(initialSection);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (section.file) {
      const imageUrl = await uploadImage(section.file);
      onSave({...section, imageUrl});
    } else {
      onSave(section);
    }
  };

  const handleChange = (field, value) => {
    setSection(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setSection(prev => ({ ...prev, file: e.target.files[0] }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">{section.id ? 'Edit Section' : 'Add Section'}</h2>
        <input
          type="text"
          placeholder="Section Name"
          value={section.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
        {loading && <p>Loading...</p>}
        <div className="mt-4 flex justify-end space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SectionForm;
