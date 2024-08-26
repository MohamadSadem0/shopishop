import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from './logo.jpeg';
import './index.css';
import { HiLocationMarker } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa'; 
import { PiShoppingBagFill } from 'react-icons/pi';
import { BiExit } from 'react-icons/bi';
import { FaStore } from 'react-icons/fa';

const Layout = () => {
  const [user, setUser] = useState(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      try {
        setUser(userInfo.result);
        setIsIn(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
// console.log(user)
  const location = useLocation();

  return (
    <div>
    
        <nav>
       
          <div>
            <ul>
              <li>
                <NavLink to="/merchant/home" className={location.pathname === "/" ? "active" : ""}>
                  <img width={150} src={logo} alt="Logo" />
                </NavLink>
              </li>
            
              <div>
                <li>
                  <NavLink to="/merchant/addStore" className={location.pathname === "/stores" ? "active" : ""}>
                    <FaStore /> my store
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/items" className={location.pathname === "/items" ? "active" : ""}>
                    <PiShoppingBagFill /> Items
                  </NavLink>
                </li>
              </div>
              <li>
                <NavLink to="/merchant/orders" className={location.pathname === "/merchant/orders" ? "active" : ""}>
                  <FaShoppingCart /> orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/map" className={location.pathname === "/map" ? "active" : ""}>
                  <HiLocationMarker /> Map
                </NavLink>
              </li>
              <li className="mt-auto">
                <NavLink
                  className="flex-row"
                  onClick={() => {
                    localStorage.clear();
                    setIsIn(false);
                  }}
                  to="/login"
                >
                  <BiExit /> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
     
    </div>
  );
};

export default Layout;
