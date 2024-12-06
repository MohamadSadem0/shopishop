import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import useCloudinaryUpload from '../../../hooks/useCloudinaryUpload';
import { useFetchRedux } from '../../../hooks/useFetchRedux';
import { fetchAllSections } from '../../../redux/slices/serviceSectionsSlice';

import {createCategoryAPI} from "../../../services/createProductAPI";

const AddCategoryForm = ({ onClose, onCategoryAdded }) => {
  // Use the custom hook for fetching sections
  const { sections, status, error } = useFetchRedux({
    sliceName: 'sections', // Name of the Redux slice
    fetchFunction: fetchAllSections, // Pass the function reference here
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
    if (!selectedSection) {
      setFormError('Please select a section');
      return;
    }
    if (!newCategory.imageUrl) {
      setFormError('Please upload an image');
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      const createdCategory = await createCategoryAPI(
        newCategory,
        selectedSection,
        token
      );
      onCategoryAdded(createdCategory);
      onClose();
    } catch (err) {
      setFormError('Failed to add category');
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
        setFormError('Failed to upload image');
        console.error(err);
      }
    }
  };

  const handleRemoveImage = () => {
    setNewCategory({ ...newCategory, imageUrl: '' });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-7/12 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Add New Category</h2>
          <button onClick={onClose} className="text-lg font-semibold">
            <Close
              sx={{
                fontSize: 25,
                color: 'black',
                transition:
                  'color 0.3s ease-in-out, transform 0.3s ease-in-out',
                stroke: 'black',
                '&:hover': {
                  color: 'gray',
                  transform: 'scale(1.2)',
                },
              }}
            />
          </button>
        </div>
        {formError && <p className="text-red-500">{formError}</p>}
        {uploadError && <p className="text-red-500">{uploadError}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>

        {status === 'loading' && <p>Loading sections...</p>}
        {sections.length === 0 && status === 'succeeded' && (
          <p className="text-gray-500">No sections available.</p>
        )}

        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          className="border p-2 w-full"
        ></textarea>
        <div className="flex flex-col items-center">
          <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
            Upload Image
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploadLoading}
            />
          </label>
        </div>
        <div className="relative w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
          {newCategory.imageUrl && (
            <div className="w-full flex flex-row items-center content-center">
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
                    stroke: 'black',
                    '&:hover': {
                      color: 'gray',
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              </button>
            </div>
          )}
          {uploadLoading && (
            <p className="text-blue-500 text-center mt-2">Uploading image...</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
