import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import { useFetchRedux } from '../../../hooks/reduxHooks/useFetchRedux';
import useCloudinaryUpload from '../../../hooks/useCloudinaryUpload';
import { fetchAllSections } from '../../../redux/slices/sectionSlice';
import { createCategoryAPI } from '../../../services/createProductAPI';

const AddCategoryForm = ({ onClose, onCategoryAdded }) => {
  // Fetch sections using Redux
  const {
    fetchedData:sections = [],
    status: status,
    error: fetchError,
  } = useFetchRedux({
    sliceName: 'sections',
    fetchFunction: fetchAllSections,
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });
  const [selectedSection, setSelectedSection] = useState('');
  const [formError, setFormError] = useState('');
  const {
    uploadImage,
    loading: uploadLoading,
    error: uploadError,
  } = useCloudinaryUpload();

  const handleAddCategory = async () => {
    setFormError('');

    // Basic validation
    if (!newCategory.name) {
      setFormError('Category name is required.');
      return;
    }
    if (!selectedSection) {
      setFormError('Please select a section.');
      return;
    }
    if (!newCategory.imageUrl) {
      setFormError('Please upload an image.');
      return;
    }

    try {

      const createdCategory = await createCategoryAPI(
        newCategory,
        selectedSection,
      );
      onCategoryAdded(createdCategory);
      onClose();
    } catch (err) {
      setFormError('Failed to add category. Please try again.');
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedImageUrl = await uploadImage(file);
        setNewCategory({ ...newCategory, imageUrl: uploadedImageUrl });
      } catch (err) {
        setFormError('Failed to upload image. Please try again.');
        console.error(err);
      }
    }
  };

  const handleRemoveImage = () => {
    setNewCategory({ ...newCategory, imageUrl: '' });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-7/12 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Add New Category</h2>
          <button onClick={onClose} className="text-lg font-semibold">
            <Close
              sx={{
                fontSize: 25,
                color: 'black',
                transition:
                  'color 0.3s ease-in-out, transform 0.3s ease-in-out',
                '&:hover': { color: 'gray', transform: 'scale(1.2)' },
              }}
            />
          </button>
        </div>

        {/* Error Messages */}
        {(formError || uploadError || fetchError) && (
          <p className="text-red-500">
            {formError || uploadError || fetchError || 'An error occurred.'}
          </p>
        )}

        {/* Section Selector */}
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border p-2 w-full"
          disabled={status === 'loading' || uploadLoading}
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
        {status === 'loading' && (
          <p className="text-blue-500 text-center">Loading sections...</p>
        )}
        {sections.length === 0 && status === 'succeeded' && (
          <p className="text-gray-500">No sections available.</p>
        )}

        {/* Form Fields */}
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          className="border p-2 w-full"
          disabled={uploadLoading}
        />
        <textarea
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          className="border p-2 w-full"
          disabled={uploadLoading}
        ></textarea>

        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <label
            className={`bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 ${
              uploadLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Upload Image
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploadLoading}
            />
          </label>
        </div>

        {newCategory.imageUrl && (
          <div className="relative w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
            <img
              src={newCategory.imageUrl}
              alt="Uploaded Preview"
              className="block max-w-sm max-h-60"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-0 right-1"
            >
              <Close
                sx={{
                  fontSize: 20,
                  color: 'black',
                  transition:
                    'color 0.3s ease-in-out, transform 0.3s ease-in-out',
                  '&:hover': { color: 'gray', transform: 'scale(1.2)' },
                }}
              />
            </button>
          </div>
        )}
        {uploadLoading && (
          <p className="text-blue-500 text-center mt-2">Uploading image...</p>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAddCategory}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${
              uploadLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={uploadLoading}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
