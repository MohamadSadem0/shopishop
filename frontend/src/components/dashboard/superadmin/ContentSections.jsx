import React, { useState, useEffect } from 'react';
import SectionCard from '../cards/SectionCard';
import SectionForm from '../forms/SectionForm';
import ErrorModal from '../../common/ErrorModal'; // Import the ErrorModal component
import { fetchSections, createSection, updateSection, deleteSection } from '../../../services/sectionService';

const ContentSections = ({ searchQuery }) => {  // Accept searchQuery as a prop
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState(''); // State to handle errors
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // State to control error modal visibility

  // Load sections when the component mounts
  useEffect(() => {
    const loadSections = async () => {
      try {
        const fetchedSections = await fetchSections();
        setSections(fetchedSections);
      } catch (error) {
        setError('Failed to load sections: ' + error.message); // Set error message
        setIsErrorModalOpen(true); // Show error modal
      }
    };
    loadSections();
  }, []);

  // Handle section edit
  const handleEdit = (section) => {
    setCurrentSection(section);  // Set the section to be edited
    setIsFormOpen(true);  // Open the form as a popup
  };

  // Handle section delete
  const handleDelete = async (id) => {
    try {
      await deleteSection(id);
      setSections(sections.filter(section => section.id !== id)); // Remove the deleted section
    } catch (error) {
      setError('Failed to delete section: ' + error.message); // Set error message
      setIsErrorModalOpen(true); // Show error modal
    }
  };

  // Handle save for both add and edit
  const handleSave = async (section) => {
    try {
      if (section.id) {
        // Update existing section
        const updatedSection = await updateSection(section);
        setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s)); // Update section in the list
      } else {
        // Create new section
        const newSection = await createSection(section);
        setSections([...sections, newSection]); // Add the new section to the list
      }
      setIsFormOpen(false); // Close the form after save
    } catch (error) {
      setError('Failed to save section: ' + error.message); // Set error message
      setIsErrorModalOpen(true); // Show error modal
    }
  };

  // Handle adding new section
  const handleAddNew = () => {
    setCurrentSection({}); // Reset section to an empty object
    setIsFormOpen(true);  // Open form for new section
  };

  const handleClose = () => {
    setIsFormOpen(false);  // Close the form
  };

  // Filter sections based on search query
  const filteredSections = sections.filter((section) => {
    const name = section.name.toLowerCase();
    const trimmedSearchQuery = searchQuery.trim().toLowerCase(); // Use the passed searchQuery prop

    return name.includes(trimmedSearchQuery); // Filter sections by name
  });

  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sections</h2>
        {/* Search input is removed as it's now passed from a parent */}
      </div>

      <button onClick={handleAddNew} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add New Section
      </button>

      <div className="grid grid-cols-3 gap-4">
        {filteredSections.length > 0 ? (
          filteredSections.map(section => (
            <SectionCard key={section.id} section={section} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        ) : (
          <p className="mt-4 text-gray-600">No sections match the search query.</p>
        )}
      </div>

      {isFormOpen && <SectionForm onClose={handleClose} onSave={handleSave} initialSection={currentSection} />}
      <ErrorModal
        isOpen={isErrorModalOpen}
        error={error}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
};

export default ContentSections;
