import React, { useState, useEffect } from 'react';
import { createCategory } from '../../../services/categoryAPI';
import { fetchSections as fetchAllSections } from '../../../services/sectionService';
import useCloudinaryUpload from '../../../hooks/useCloudinaryUpload';  // Adjust the import path for the custom hook

const AddCategoryForm = ({ onClose, onCategoryAdded }) => {
  const [sections, setSections] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', imageUrl: '' });
  const [selectedSection, setSelectedSection] = useState('');
  const [error, setError] = useState('');

  // Cloudinary upload hook
  const { uploadImage, imageUrl, loading, error: uploadError } = useCloudinaryUpload();

  // Fetch sections when the form is opened
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
        const fetchedSections = await fetchAllSections(token); // Fetch sections
        setSections(fetchedSections);
      } catch (err) {
        setError('Failed to fetch sections');
      }
    };
    fetchSections();
  }, []);

  // Handle form submit to create a new category
  const handleAddCategory = async () => {
    if (!selectedSection) {
      setError('Please select a section');
      return;
    }
    if (!newCategory.imageUrl) {
      setError('Please upload an image');
      return;
    }
    try {
      const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
      const createdCategory = await createCategory(newCategory, selectedSection, token); // Send sectionId along
      onCategoryAdded(createdCategory); // Call the callback to add the new category
      onClose(); // Close the form
    } catch (error) {
      setError('Failed to add category');
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedImageUrl = await uploadImage(file); // Upload image to Cloudinary
        setNewCategory({ ...newCategory, imageUrl: uploadedImageUrl }); // Update image URL in the form
      } catch (err) {
        setError('Failed to upload image');
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}

        {/* Section Selection Dropdown */}
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          className="border p-2 mb-4 w-full"
        />

        {/* File input for image upload */}
        <input
          type="file"
          onChange={handleImageUpload}
          className="border p-2 mb-4 w-full"
          disabled={loading}  // Disable input while uploading
        />
        {loading && <p>Uploading image...</p>}

        <input
          type="text"
          placeholder="Image URL"
          value={newCategory.imageUrl} // This will be filled automatically after upload
          onChange={(e) => setNewCategory({ ...newCategory, imageUrl: e.target.value })}
          className="border p-2 mb-4 w-full"
          disabled
        />

        <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded ml-4">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
