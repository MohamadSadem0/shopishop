import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addSection.css';
import { useNavigate } from 'react-router-dom';
import SuperAdminNav from '../../../componets/superAdmin/layout/superAdminNav';
import { ProgressBar } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
const SectionAdd = () => {
  const [userId, setUserId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [underSection,setUnderSection] = useState('add or select a section')
  const [formData, setFormData] = useState({
    sectionName: '',
    sectionImage: null,
    categoryName: '',
    categoryImage: null,
  });
  const [sectionLoading, setSectionLoading] = useState(false); 
  const [categoryLoading, setCategoryLoading] = useState(false); 
  const [sectionResultMessage, setSectionResultMessage] = useState('');
  const [categoryResultMessage, setCategoryResultMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sections/getSections');
        if (response.status === 200) {
          setSections(response.data);
        } else {
          console.log('Error: Unable to fetch sections');
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    getSections();
  }, [sectionResultMessage]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      try {
        setUserId(userInfo.result._id);
        setIsAdmin(userInfo.result.role === 'superAdmin');
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (sectionResultMessage) {
      const timeout = setTimeout(() => setSectionResultMessage(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [sectionResultMessage]);

  useEffect(() => {
    if (categoryResultMessage) {
      const timeout = setTimeout(() => setCategoryResultMessage(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [categoryResultMessage]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedSection(selectedId);
    setSectionId(selectedId);
    setSelectedSectionId(selectedId);
    console.log('Selected Section:', selectedId);

    if (selectedId) {
      const selectedSectionName = sections.find(section => section._id === selectedId)?.name;
      setUnderSection(`Adding categories under the section : ${selectedSectionName}`);
    } else {
      setUnderSection(''); // Reset to default state
    }
  
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmitSection = async (e) => {
    e.preventDefault();
    setSectionLoading(true);
    setSectionResultMessage('');

    const formDataObj = new FormData();
    formDataObj.append('name', formData.sectionName);
    formDataObj.append('image', formData.sectionImage);

    try {
      const response = await axios.post('http://localhost:5000/sections/addSection', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSectionId(response.data.section._id);
      setSelectedSectionId(response.data.section._id);
      setSectionResultMessage('Section added successfully');

      if (response.data.section._id) {
      
        setUnderSection(`Adding categories under the section : ${response.data.section.name}`);
      } else {
        setUnderSection(''); // Reset to default state
      }


    } catch (error) {
      console.error('Error adding section:', error);
      setSectionResultMessage('Failed to add section');
    } finally {
      setSectionLoading(false);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    setCategoryLoading(true);
    setCategoryResultMessage('');

    const formDataObj = new FormData();
    formDataObj.append('name', formData.categoryName);
    formDataObj.append('image', formData.categoryImage);
    formDataObj.append('sectionId', selectedSectionId);
    formDataObj.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:5000/categories/addCategory', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCategoryResultMessage('Category added successfully');
    } catch (error) {
      console.error('Error adding category:', error);
      setCategoryResultMessage('Failed to add category');
    } finally {
      setCategoryLoading(false);
    }
  };

  const clearInputs = () => {
    setFormData({
      sectionName: '',
      sectionImage: null,
      categoryName: '',
      categoryImage: null,
    });
    setSelectedSection('');
    setSectionId(null);
    setSelectedSectionId('');
  };

  const clearSec = () => {
    setFormData({
      sectionName: '',
      sectionImage: null,
    });
  };

  const clearCat = () => {
    setFormData({
      categoryName: '',
      categoryImage: null,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='d-flex '>
      <SuperAdminNav />
     

      <div className="page-container">
        <div className='cardd mt-5 page-container-element'>
        <Link to="/superAdmin/sections" className="custom-link">
        <i className="fas fa-arrow-left back-icon"></i> back to sections
      </Link>
          <h2>Section</h2>
          <div className="select-section">
          <h1>Select or add a section to add a category under it</h1>
          <select onChange={handleSelectChange} value={selectedSection}>
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
          <form onSubmit={handleSubmitSection}>
            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <label>Section Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="sectionName"
                    value={formData.sectionName}
                    onChange={handleChange}
                    placeholder="Section Name"
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className="form-group">
                  <label>Section Image</label>
                  <input
                    className="form-control"
                    type="file"
                    name="sectionImage"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
              <button className='btn btn-secondary w-auto' type="button" onClick={clearSec}>Clear</button>
              <button className='btn btn-primary w-auto' type="submit">Add Section</button>
            </div>
          </form>
          {sectionLoading && <Spinner animation="border" role="status" variant='warning'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>}
          {sectionResultMessage && (
            <div style={{background:"green",color:"white",padding:"0.5rem",borderRadius:"0.5rem"}} className={`result-message ${sectionResultMessage.includes('Failed') ? 'failure' : 'success'} mt-2`}>
              {sectionResultMessage}
            </div>
          )}
      
        </div>

       <div className='page-container-element cardd mt-5'>
       {true && (
        <div className=''>
          <h2>Category</h2>
          <h2>{underSection}</h2>
          <form onSubmit={handleSubmitCategory}>
            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    placeholder="Category Name"
                    required
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className="form-group">
                  <label>Category Image</label>
                  <input
                    className="form-control"
                    type="file"
                    name="categoryImage"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
              <button className='btn btn-secondary w-auto' type="button" onClick={clearInputs}>Clear</button>
              <button className='btn btn-primary w-auto' type="button" onClick={clearCat}>New Category</button>
              <button className='btn btn-primary w-auto' type="submit">Add Category</button>
            </div>
          </form>
          {categoryLoading && <Spinner animation="border" role="status" variant='warning'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>}
          {categoryResultMessage && (
            <div style={{background:"green",color:"white",padding:"0.5rem",borderRadius:"0.5rem"}} className={`result-message ${categoryResultMessage.includes('Failed') ? 'failure' : 'success'} mt-2`}>
              {categoryResultMessage}
            </div>
          )}
        </div>
      )}
       </div>
      </div>
     
    </div>
  );
};

export default SectionAdd;
