
import React, { useState, useEffect } from 'react';
import SectionCard from '../cards/SectionCard';
import SectionForm from '../forms/SectionForm';
import ErrorModal from '../../common/ErrorModal';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the ClipLoader
import { fetchSections, createSection, updateSection, deleteSection } from '../../../services/sectionService';

const ContentSections = ({ searchQuery }) => {
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState(''); // Handle errors
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedSection, setSelectedSection] = useState('All'); // Section filter

  // Load sections when the component mounts
  useEffect(() => {
    const loadSections = async () => {
      setLoading(true);
      try {
        const fetchedSections = await fetchSections();
        setSections(fetchedSections);
      } catch (error) {
        setError('Failed to load sections: ' + error.message);
        setIsErrorModalOpen(true);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    loadSections();
  }, []);

  // Handle section edit
  const handleEdit = (section) => {
    setCurrentSection(section);
    setIsFormOpen(true);
  };

  // Handle section delete
  const handleDelete = async (id) => {
    try {
      await deleteSection(id);
      setSections(sections.filter(section => section.id !== id));
    } catch (error) {
      setError('Failed to delete section: ' + error.message);
      setIsErrorModalOpen(true);
    }
  };

  // Handle save for both add and edit
  const handleSave = async (section) => {
    try {
      if (section.id) {
        
        const updatedSection = await updateSection(section);
        console.log(updateSection);
        
        setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s));
        
      } else {
        const newSection = await createSection(section);
        setSections([...sections, newSection]);
      }
      setIsFormOpen(false);
    } catch (error) {
      setError('Failed to save section: ' + error.message);
      console.log(updateSection);

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

  // Filter sections based on search query and selected section
  const filteredSections = sections.filter((section) => {
    const matchesSection = selectedSection === 'All' || section.category === selectedSection;
    const name = section.name.toLowerCase();
    const trimmedSearchQuery = searchQuery.trim().toLowerCase();

    return matchesSection && name.includes(trimmedSearchQuery);
  });

  return (
    <div className="p-8 w-full bg-color3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sections</h2>
        <div>
          <select
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="All">All Categories</option>
            {sections.map((section) => (
              <option key={section.id} value={section.category}>
                {section.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <ClipLoader color="#4A90E2" size={50} />
      ) : (
        <>
          <button
            onClick={handleAddNew}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Section
          </button>

          <div className="flex flex-wrap mt-4">
            {filteredSections.length > 0 ? (
              filteredSections.map(section => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="mt-4 text-gray-600">No sections match the search query or category.</p>
            )}
          </div>

          {isFormOpen && (
            <SectionForm
              onClose={handleClose}
              onSave={handleSave}
              initialSection={currentSection}
            />
          )}

          <ErrorModal
            isOpen={isErrorModalOpen}
            error={error}
            onClose={() => setIsErrorModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default ContentSections;