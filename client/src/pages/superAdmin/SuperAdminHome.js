import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuperAdminNav from '../../componets/superAdmin/layout/superAdminNav';
import io from 'socket.io-client';
import axios from 'axios';
import './superAdminHome.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const socket = io('http://localhost:5000'); // Replace with your server URL

const ArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="arrow-icon"
  >
    <path
      d="M8 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SuperAdminHome = () => {
  const [approvedStores,setApprovedStores] = useState(0);
  const [unApprovedStores,setunApprovedStores] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const superAdminId = '66c2f4ef8b23868aa136b18e'; // Define your super admin ID here
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // Track if the logged-in user is the super admin

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user_info'))?.result?._id;
    const fetchStoreCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stores/countStores');
        const { approvedCount, unapprovedCount } = response.data;
        setApprovedStores(approvedCount);
        setunApprovedStores(unapprovedCount);
        // console.log('Number of approved stores:', approvedCount);
        // console.log('Number of unapproved stores:', unapprovedCount);
      } catch (error) {
        console.error('Error fetching store counts:', error);
      }
    };

    fetchStoreCounts();
    if (userId === superAdminId) {
      setIsSuperAdmin(true); // Set super admin status
      fetchNotifications(); // Fetch notifications from the DB
      socket.emit('joinRoom', superAdminId); // Join the room for real-time updates

      socket.on('newStoreRequest', (data) => {
        fetchStoreCounts();
        const { newNotification } = data;
        if (newNotification.superAdminId === superAdminId) {
          toast.info(`${newNotification.operation}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'custom-toast',
            toastClassName: 'custom-toast'
          });
        }
 
         const markAsRead= async ()=>{
          console.log(data);
          const response =   await axios.put('http://localhost:5000/notifications/markNotificationsAsRead', {  
            notificationIds: [data.newNotification._id]
            });
            // console.log(response)
          }
     markAsRead();
        } 
     
      
    );

      socket.on('userLoggedIn', (data) => {
        const { operation, createdAt, _id, read } = data.newNotification;

        if (read === false) {
          toast.info(`${operation} at ${new Date(createdAt).toLocaleString()}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'custom-toast',
            toastClassName: 'custom-toast'
          });

          try {
            axios.put('http://localhost:5000/notifications/markNotificationsAsRead', {
              notificationIds: [_id]
            });
          } catch (error) {
            console.error('Error marking notification as read:', error);
          }
        }
      });
    } else {
      setIsSuperAdmin(false); // Not super admin
      fetchNotifications(); // Fetch notifications from the DB
    }

    // Cleanup on component unmount
    return () => {
      socket.off('newStoreRequest');
      socket.off('userLoggedIn');
    };
  }, [location.pathname, superAdminId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/getNotifications');
      const fetchedNotifications = response.data.response;
      // console.log(fetchedNotifications);
      fetchedNotifications.forEach(notification => {
        if (notification.read === false) {
          toast.info(`${notification.operation} at ${new Date(notification.createdAt).toLocaleString()}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'custom-toast',
            toastClassName: 'custom-toast'
          });
        }else{
          return;
        }
      });

      setNotifications(fetchedNotifications);

      if (fetchedNotifications.some(notification => notification.read === false)) {
        const unreadNotificationIds = fetchedNotifications
          .filter(notification => notification.read === false)
          .map(notification => notification._id);

        await axios.put('http://localhost:5000/notifications/markNotificationsAsRead', {
          notificationIds: unreadNotificationIds
        });
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

console.log(location)




  return (
    <div className='d-flex'>
      <SuperAdminNav />
      <div className="card-container">
        <div className="card">
          <Link to="/stores-requests" className="card-link">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvUm8fI-1mOloIr70TiIuze-bLzSku1ZXdEw&s" alt="Stores Requests" className="card-img" />
            <h5>Stores  <ArrowIcon /></h5>
          </Link>
          <p>Current Stores : {approvedStores}</p>
          <p>Stores Requests : {unApprovedStores}</p>
        </div>
        <div className="card">
          <Link to="/items" className="card-link">
            <img src="https://via.placeholder.com/100" alt="Items" className="card-img" />
            <h5>Items <ArrowIcon /></h5>
          </Link>
          <p>Number of items: 50</p>
        </div>
        <div className="card">
          <Link to="/categories" className="card-link">
            <img src="https://via.placeholder.com/100" alt="Categories" className="card-img" />
            <h5>Categories <ArrowIcon /></h5>
          </Link>
          <p>Number of categories: 15</p>
        </div>
        <div className="card">
          <Link to="/orders" className="card-link">
            <img src="https://via.placeholder.com/100" alt="Orders" className="card-img" />
            <h5>Orders <ArrowIcon /></h5>
          </Link>
          <p>Number of orders: 120</p>
        </div>
        <div className="card">
          <Link to="/notifications" className="card-link">
            <img src="https://via.placeholder.com/100" alt="Notifications" className="card-img" />
            <h5>Notifications <ArrowIcon /></h5>
          </Link>
          <p>Number of notifications: 5</p>
        </div>
        <div className="card">
          <Link to="/statistics" className="card-link">
            <img src="https://via.placeholder.com/100" alt="Statistics" className="card-img" />
            <h5>Statistics <ArrowIcon /></h5>
          </Link>
          <p>Statistics details...</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SuperAdminHome;
