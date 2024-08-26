import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from './logo.jpeg';
import './index.css';
import { HiLocationMarker } from 'react-icons/hi';
import { MdDashboardCustomize } from 'react-icons/md';
import { PiShoppingBagFill } from 'react-icons/pi';
import { BiExit } from 'react-icons/bi';
import { FaStore } from 'react-icons/fa';


import {Link} from "react-router-dom"
import {connect} from "react-redux"
import io from 'socket.io-client';
import {useDispatch} from "react-redux"
import {LOGOUT} from "../../../redux/const/actionsTypes"
import { useNavigate } from "react-router-dom";
const socket = io('http://localhost:5000'); // Replace with your server URL
const Layout = (props) => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [authenticated,setAuthenticated] = useState(true)

  

   
    function handleLogOut(e) {
        e.preventDefault();
        socket.disconnect(); // Clean up the socket connection
        navigate('/account/login');
        dispatch({type: LOGOUT})
    }
  const location = useLocation();

  return (
    <div style={{margin:"1.5rem;"}}>
    
       {authenticated &&  <nav>
        <div>
          <ul>
            <li>
              <NavLink to="/superAdmin/home" className={location.pathname === "/" ? "active" : ""}>
                <img width={150} src={logo} alt="Logo" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/superAdmin/sections" className={location.pathname === "/superAdmin/sections" || location.pathname === "/superAdmin/addSection" ? "active" : ""}>
                <MdDashboardCustomize /> Sections
              </NavLink>
            </li>
            <div>
              <li>
                <NavLink to="/superAdmin/stores" className={location.pathname === "/superAdmin/stores" ? "active" : ""}>
                  <FaStore /> Stores
                </NavLink>
              </li>
              <li>
                <NavLink to="/superAdmin/items" className={location.pathname === "/superAdmin/items" ? "active" : ""}>
                  <PiShoppingBagFill /> Items
                </NavLink>
              </li>
            </div>
            <li>
              <NavLink to="/superAdmin/map" className={location.pathname === "/superAdmin/map" ? "active" : ""}>
                <HiLocationMarker /> Map
              </NavLink>
            </li>
            <li className="mt-auto">
              <button
                className="flex-row btn-logout"
                onClick={handleLogOut}
               
              >
                <BiExit /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
   }
    </div>
  );
};

export default Layout;
