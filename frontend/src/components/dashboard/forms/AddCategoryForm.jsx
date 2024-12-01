import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCloudinaryUpload from '../../../hooks/useCloudinaryUpload';
import { fetchAllSections, setSections } from '../../../redux/slices/serviceSectionsSlice';
import { createCategory } from '../../../services/categoryAPI';

const AddCategoryForm = ({ onClose, onCategoryAdded }) => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });
  const [selectedSection, setSelectedSection] = useState('');
  const [error, setError] = useState('');

  const { uploadImage, loading: uploadLoading, error: uploadError } = useCloudinaryUpload();
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections?.sections || []);
  const sectionState = useSelector((state) => state.sections?.status || 'idle');
  const sectionError = useSelector((state) => state.sections?.error || null);

  useEffect(() => {
    if (sectionState === 'idle') {
      dispatch(fetchAllSections())
        .unwrap()
        .then((data) => {
          dispatch(setSections(data)); // Manually update sections
          console.log('Fetched and set sections:', data);
        })
        .catch((err) => console.error('Error fetching sections:', err));
    }
  }, [sectionState, dispatch]);

  const handleAddCategory = async () => {
    setError('');
    if (!selectedSection) {
      setError('Please select a section');
      return;
    }
    if (!newCategory.imageUrl) {
      setError('Please upload an image');
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      const createdCategory = await createCategory(newCategory, selectedSection, token);
      onCategoryAdded(createdCategory);
      onClose();
    } catch (err) {
      setError('Failed to add category');
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
        setError('Failed to upload image');
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
        {sectionError && <p className="text-red-500 mb-4">{sectionError}</p>}
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
        <textarea
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          className="border p-2 mb-4 w-full"
        ></textarea>
        <input
          type="file"
          onChange={handleImageUpload}
          className="border p-2 mb-4 w-full"
          disabled={uploadLoading}
        />
        {uploadLoading && <p className="text-blue-500">Uploading image...</p>}
        <input
          type="text"
          placeholder="Image URL"
          value={newCategory.imageUrl}
          onChange={(e) => setNewCategory({ ...newCategory, imageUrl: e.target.value })}
          className="border p-2 mb-4 w-full"
          disabled
        />
        <div className="flex justify-end">
          <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded ml-4">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
