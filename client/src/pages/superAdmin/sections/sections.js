import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './sections.css';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FcApprove } from 'react-icons/fc';
import { TiTick, TiTimes } from 'react-icons/ti';
import SuperAdminNav from '../../../componets/superAdmin/layout/superAdminNav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';

const socket = io('http://localhost:5000');

function Sections() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sectionCategory, setSectionCategory] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const userRole = userInfo ? userInfo.result.role : null;
    if (userRole === 'superAdmin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get('http://localhost:5000/sections/getSections');
      setSections(response.data);
    };

    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:5000/categories/getCategories');
      setCategories(response.data);
    };

    const processSectionCategory = (sections, categories) => {
      const sectionCategoryMap = sections.map(section => {
        return {
          sectionId: section._id,
          categories: categories.filter(category => category.sectionId === section._id)
        };
      });
      setSectionCategory(sectionCategoryMap);
    };

    const fetchData = async () => {
      try {
        await fetchSections();
        await fetchCategories();
        processSectionCategory(sections, categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    socket.on('newSection', (section) => {
      setSections((prevSections) => [...prevSections, section]);
      toast.info('New section added');
    });

    return () => {
      socket.off('newSection');
    };
  }, []);

  useEffect(() => {
    const processSectionCategory = () => {
      const sectionCategoryMap = sections.map(section => {
        return {
          sectionId: section._id,
          categories: categories.filter(category => category.sectionId === section._id)
        };
      });
      setSectionCategory(sectionCategoryMap);
    };

    if (sections.length > 0 && categories.length > 0) {
      processSectionCategory();
    }
  }, [sections, categories]);

  return (
    <div className='d-flex'>
      <SuperAdminNav />
      <ToastContainer />
      <div className='main-container'>
        <div className='gap-2 mb-3 align-items-center'>
          <h1 className='mb-0'>Sections</h1>
          <Link className="ml-auto btn btn-primary" to='/superAdmin/addSection'>Add Section</Link>
        </div>
        <div className='cardd'>
          <div className='post-list'>
            {loading ? (
              <div className="loading-message">
                <ProgressBar animated now={100} />
                <p>Loading sections and categories...</p>
              </div>
            ) : (
              sections.map((section) => (
                <div key={section._id}>
                  <div className='list-item gap-3'>
                    <div><img className="rounded" src={section.imageUrl} alt="image" /></div>
                    <div className='row-end'>
                      <h1>{section.name}</h1>
                      {sectionCategory.find(secCat => secCat.sectionId === section._id)?.categories.map(category => (
                        <p key={category._id}>{category.name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sections;
