import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the ClipLoader
import { useFetchRedux } from '../../../hooks/reduxHooks/useFetchRedux';
import { fetchAllSections } from '../../../redux/slices/sectionSlice';
import ErrorModal from '../../common/ErrorModal';
import SectionCard from '../cards/SectionCard';
import SectionForm from '../forms/SectionForm';
import { createSectionAPI } from "../../../services/createProductAPI";
import { updateSectionAPI } from "../../../services/updateService";
import { deleteSectionAPI } from "../../../services/deleteService";

const ContentSections = ({ searchQuery }) => {
  const {
    fetchedData: sections = [],
    status: status,
    error: fetchError,
  } = useFetchRedux({
    sliceName: 'sections',
    fetchFunction: fetchAllSections,
    dataName: 'sections',
  });

  const [currentSection, setCurrentSection] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Handle section edit
  const handleEdit = (section) => {
    setCurrentSection(section);
    setIsFormOpen(true);
  };

  // Handle section delete
  const handleDelete = async (id) => {
    try {
      const response = await deleteSectionAPI(id);
      setModalMessage(response.message || 'Section deleted successfully!');
    } catch (error) {
      setModalMessage(
        error.response?.data?.message ||
        'Failed to delete section. Please try again.'
      );
    } finally {
      setIsErrorModalOpen(true);
    }
  };

  // Handle save for both add and edit
  const handleSave = async (section) => {
    try {
      if (section.id) {
        await updateSectionAPI(section);
      } else {
        await createSectionAPI(section);
      }
      setIsFormOpen(false);
    } catch (error) {
      setModalMessage(
        error.response?.data?.message ||
        'Failed to save section. Please try again.'
      );
      setIsErrorModalOpen(true);
    }
  };

  // Handle adding a new section
  const handleAddNew = () => {
    setCurrentSection({});
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
  };

  // Filter sections based on search query
  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="p-4 w-full bg-color3">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Sections</h2>
        </div>

        <div>
          <button
            onClick={handleAddNew}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Section
          </button>
        </div>
      </div>

      {/* Display Error */}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

      {/* Loading Spinner */}
      {status === 'loading' ? (
        <div className="flex justify-center">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      ) : (
        <>
          {/* Sections Display */}
          <div className="w-full flex flex-wrap items-center justify-between mt-4 ">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="mt-4 text-gray-600 w-full text-center">
                No sections match the search query.
              </p>
            )}
          </div>

          {/* Add Section Form */}
          {isFormOpen && (
            <SectionForm
              onClose={handleClose}
              onSave={handleSave}
              initialSection={currentSection}
            />
          )}

          {/* Error Modal */}
          <ErrorModal
            isOpen={isErrorModalOpen}
            error={modalMessage}
            onClose={() => setIsErrorModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default ContentSections;
