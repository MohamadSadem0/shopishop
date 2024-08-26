import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './merchantAddStore.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import MerchantNav from '../../../componets/merchant/layout/merchantNav';

const AddStore = ({ userIdd }) => {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [storeId, setStoreId] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    currency: '',
    address: '',
    deliveryTime: '',
    whatTheySell: '',
    openUntil: '',
    exchangeRate: null,
    image: null,
    storeCategories: [], // Renamed to storeCategories
    categories: [], // Store selected categories from checkboxes
  });
  const test = ()=>{
    console.log('form data' , formData)
  }
  const [storeCategories, setStoreCategories] = useState(['']); // Renamed to storeCategories
  const [storeCreated, setStoreCreated] = useState(true); // Track store creation status

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      try {
        setUserId(userInfo.result._id);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: userId,
      }));
    }
  }, [userId]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sections/getSections');
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const handleChange = async (e) => {
    // Clear the categories array when a new section is selected
    if (e.target.name === 'sectionId') {
      setFormData({
        ...formData,
        categories: [], // Clear the categories array
        [e.target.name]: e.target.value,
      });
  
      if (e.target.value) {
        try {
          // Fetch categories based on the selected section
          const response = await axios.get(`http://localhost:5000/categories/getCategoryBySectionId/${e.target.value}`);
          setAvailableCategories(response.data.data);
        } catch (error) {
          setAvailableCategories([]);
          console.error('Error fetching categories:', error);
        }
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleStoreCategoryChange = (index, value) => {
    const updatedStoreCategories = [...storeCategories];
    updatedStoreCategories[index] = value;
    setStoreCategories(updatedStoreCategories);
    setFormData({
      ...formData,
      storeCategories: updatedStoreCategories,
    });
  };

  const handleAddCategoryField = () => {
    setStoreCategories([...storeCategories, '']);
  };

  const handleRemoveStoreCategoryChange = (index) => {
    const updatedStoreCategories = storeCategories.filter((_, i) => i !== index);
    setStoreCategories(updatedStoreCategories);
    setFormData({
      ...formData,
      storeCategories: updatedStoreCategories,
    });
  };

  const handleCategoryCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedCategories = [...formData.categories];

    if (checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter((categoryId) => categoryId !== value);
    }

    setFormData({
      ...formData,
      categories: updatedCategories,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    // Append form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key === 'storeCategories') {
        formData[key].forEach((storeCategory) => {
          formDataObj.append('storeCategories[]', storeCategory);
        });
      } else if (key === 'categories') {
        formData[key].forEach((category) => {
          formDataObj.append('categories[]', category); // Use 'categories[]' to send an array of strings
        });
      } else {
        formDataObj.append(key, formData[key]);
      }
    });

    // Log FormData object entries to console
    for (let [key, value] of formDataObj.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch('http://localhost:5000/stores/addStore', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();
      console.log('result:', data);
      if (data.storeId) {
        setStoreId(data.storeId);
        setStoreCreated(true); // Store creation successful
      }
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='d-flex'>

      <MerchantNav />

      <div className='card'>
        <div>
          <button className='btn btn-transparent title-back' onClick={goBack}>
            <BiArrowBack />
            <h1>Add Store</h1>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            {/* Form Fields for Store */}
            <div className='col-md-6'>
              <div className="form-group">
                <label>Store Name</label>
                <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Store Name" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Address</label>
                <input className="form-control" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Currency</label>
                <select className="form-control" name="currency" value={formData.currency} onChange={handleChange} required>
                  <option value="">Select Currency</option>
                  <option value="lbp">LBP</option>
                  <option value="usd">USD</option>
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Delivery time</label>
                <input className="form-control" type="text" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} placeholder="Delivery time" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>What they sell</label>
                <input className="form-control" type="text" name="whatTheySell" value={formData.whatTheySell} onChange={handleChange} placeholder="What they sell" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Open Until</label>
                <input className="form-control" type="text" name="openUntil" value={formData.openUntil} onChange={handleChange} placeholder="Open Until" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Exchange rate</label>
                <input className="form-control" type="text" name="exchangeRate" value={formData.exchangeRate} onChange={handleChange} placeholder="Exchange Rate" required />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Select Section</label>
                <select className="form-control" name="sectionId" value={formData.sectionId} onChange={handleChange} required>
                  <option value="">Select Section</option>
                  {sections.map((section) => (
                    <option key={section._id} value={section._id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label>Image</label>
                <input className="form-control" type="file" name="image" onChange={handleFileChange} required />
              </div>
            </div>
            <div className='col-md-6'>
              <label>Choose a section to select one or more category under it</label>
              {availableCategories && formData.sectionId && availableCategories.map((category) => (
                <div key={category._id} className="form-check form-check-inline">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`category-${category._id}`} 
                  value={category._id}
                  onChange={handleCategoryCheckboxChange}
                />
                <label className="form-check-label" htmlFor={`category-${category._id}`}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>

          <div className='col-md-12'>
            <div className='container form-group'>
              <label>Requested categories in your store</label>
              {storeCategories.map((storeCategory, index) => (
                <div className='row align-items-center' key={index}>
                  <div className='col-sm-6'>
                    <input
                      type="text"
                      className="form-control"
                      value={storeCategory}
                      onChange={(e) => handleStoreCategoryChange(index, e.target.value)}
                      placeholder="Category Name"
                      required
                    />
                  </div>
                  <div className='col-sm-1'>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveStoreCategoryChange(index)}
                      disabled={storeCategories.length === 1}
                    >
                      -
                    </button>
                  </div>
                  <div className='col-sm-1'>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleAddCategoryField}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className='btn btn-primary ml-auto' type="submit">Add Store</button>
      </form>
    </div>
  </div>
);
};

export default AddStore;

