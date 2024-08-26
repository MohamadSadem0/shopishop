import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MerchantNav from '../../../componets/merchant/layout/merchantNav';// Fixed typo in import path
import io from 'socket.io-client';
import axios from 'axios';
import './merchantHome.css';
import { Link } from 'react-router-dom';

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
  const [stores, setStores] = useState([]);
  
  const defaultStore = {
    _id: 'default-id',
    imageUrl: 'path/to/placeholder-image.png', // Path to the placeholder image
    name: 'Store Name',
    address: 'N/A  ujasgfb asifbsabf shfvsafhv sfs fshvfsfvsh fhksafbjk klsfjsbf ',
    currency: 'N/A',
    deliveryTime: 'N/A',
    rating: 'N/A',
    categories: ['N/A'],
    openUntil: 'N/A',
    whatTheySell: 'N/A',
    exchangeRate: 'N/A',
    approved: false,
  };

  // Fetch stores on component mount (if necessary)
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stores');
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.log('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className='d-flex'>
      <MerchantNav />
      <div className="cardd-container">
        <div className='cardd mt-2'>
          <h5 style={{ background: "red", color: 'white', padding: "1rem", borderRadius: "20px", width: "100%" }}>
            You still don't have a store
          </h5>
          <Link className='store-link mt-1' to="/merchant/addStore">
            <h5>Create your store</h5>
          </Link>
          <div className="store-list mt-2">
            {(stores.length > 0 ? stores : [defaultStore]).map((store) => (
              <div key={store._id} className="store-card">
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvUm8fI-1mOloIr70TiIuze-bLzSku1ZXdEw&s'
                  alt={store.name}
                  className="store-image"
                  style={{ width: '200px', height: '150px', objectFit: 'cover' }}
                />
                <h2 style={{display:"inline"}}>{store.name}</h2>
                <table className='mt-1'>
                  <tbody>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                    <tr>
                      <td><strong>Address:</strong></td>
                      <td>{store.address}</td>
                    </tr>
                    <tr>
                      <td><strong>Currency:</strong></td>
                      <td>{store.currency.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td><strong>Delivery Time:</strong></td>
                      <td>{store.deliveryTime} minutes</td>
                    </tr>
                    <tr>
                      <td><strong>Rating:</strong></td>
                      <td>{store.rating} / 5</td>
                    </tr>
                    <tr>
                      <td><strong>Categories:</strong></td>
                      <td>{store.categories.join(', ')}</td>
                    </tr>
                    <tr>
                      <td><strong>Open Until:</strong></td>
                      <td>{store.openUntil}</td>
                    </tr>
                    <tr>
                      <td><strong>What They Sell:</strong></td>
                      <td>{store.whatTheySell}</td>
                    </tr>
                    <tr>
                      <td><strong>Exchange Rate:</strong></td>
                      <td>{store.exchangeRate}</td>
                    </tr>
                  </tbody>
                </table>
                {
                  store._id !=='default-id' && <h5 className='mt-2' style={store.approved ? { color: 'black' } : { backgroundColor: 'red', padding: '10px', color: 'white' ,borderRadius:"20px"}}>
                  <strong>Approved:</strong> {store.approved ? "Yes" : "No"}
                </h5>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SuperAdminHome;
