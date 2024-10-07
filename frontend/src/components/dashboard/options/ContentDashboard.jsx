import React, { useState, useEffect } from 'react';
import MapComponent from '../MapComponent';
import DashboardItemCard from '../../cards/DashboardItemCard ';
import dummy from "../../../assets/images/back2.jpg";
import {getDecryptedItem} from '../../../utils/decryptToken'; // Import the utility function

const ContentDashboard = () => {
  const [userData, setUserData] = useState({ email: "", name: "", role: "" });

  useEffect(() => {
    const userEmail = getDecryptedItem('userEmail');  // Decrypt email using the utility function
    const userName = getDecryptedItem('userName');    // Decrypt name using the utility function
    const userRole = getDecryptedItem('userRole');    // Decrypt role using the utility function

    if (userEmail && userName && userRole) {
      setUserData({ email: userEmail, name: userName, role: userRole });
    }
  }, []);

  return (
    <div className="p-8 w-full bg-[#F7F9EB] sm:p-4">
      
      <div className="flex flex-row space-x-11 space-y-10 sm:flex-col sm:space-x-0 sm:space-y-4">
        <div className="w-2/3 sm:w-full">
          <div className="flex justify-between items-center mb-8 sm:flex-col sm:items-start sm:space-y-4 sm:mb-4">
            <div className="text-2xl sm:text-xl">Welcome back, {userData.name}</div>
            <div className="text-lg sm:text-base">Role: {userData.role}</div>
          </div>
          <div className="flex flex-row space-x-4 mb-8 sm:flex-col sm:space-x-0 sm:space-y-4">
            <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 1</div>
            <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 2</div>
            <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 3</div>
          </div>
          <div className="w-full flex flex-col rounded-[15px] p-4 h-[294px] mb-10 bg-white shadow-md sm:mb-4">
            <div>Customers numbers</div>
            <div className="w-full p-4 rounded-[10px] bg-white shadow-md">Website Detail 1</div>
          </div>
          <div className="flex flex-row space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3">
            <div className="w-full flex flex-col p-4 h-[294px] rounded-[15px] bg-white shadow-md">
              <div>Customers numbers</div>
              <div className="w-full p-4 bg-white shadow-md">Website Detail 2</div>
            </div>
            <div className="w-full flex flex-col p-4 h-[294px] bg-white shadow-md">
              <div>Customers numbers</div>
              <div className="w-full p-4 bg-white shadow-md">Website Detail 2</div>
            </div>
          </div>
        </div>

        <div className="w-1/3 h-full sm:w-full">
          <div className="flex flex-col space-y-4">
            <div className="w-full p-4 mt-5 bg-white rounded-[15px] shadow-md h-[238px]">
              <MapComponent className="h-full w-full" />
            </div>
            <div className="w-full p-4 rounded-[15px] max-h-[560px] overflow-hidden overflow-y-auto bg-white shadow-md h-auto">
              <div>Website Detail 1</div>
              <DashboardItemCard name={"hello"} rating={3} image={dummy} />
              <DashboardItemCard name={"hello"} rating={3} image={dummy} />
              <DashboardItemCard name={"hello"} rating={3} image={dummy} />
              <DashboardItemCard name={"hello"} rating={3} image={dummy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDashboard;
