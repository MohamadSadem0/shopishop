import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    const getSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sections/getSections');
        if (response.status !== 200) {
          console.log('Error: Unable to fetch sections');
        } else {
          setSections(response.data);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    getSections();
  }, []);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    setSelectedSection(selectedName);
    console.log('Selected Section:', selectedName);
  };

  return (
    <div>
      <select onChange={handleSelectChange} value={selectedSection}>
        <option value="">Select a section</option>
        {sections.map((section) => (
          <option key={section._id} value={section.name}>
            {section.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
