// import React, { useState, useEffect } from 'react';
// import CryptoJS from "crypto-js";
// import Nav from "./DashboardNavbar";
// import MapComponent from './MapComponent';
// import DashboardItemCard from '../cards/DashboardItemCard ';
// import dummy from "../../assets/images/back2.jpg"

// const Content = () => {
//   const [userData, setUserData] = useState({ email: "", name: "", role: "" });

//   useEffect(() => {
//     const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

//     // Decrypt data stored in sessionStorage
//     const encryptedUserEmail = sessionStorage.getItem("userEmail");
//     const encryptedUserName = sessionStorage.getItem("userName");
//     const encryptedUserRole = sessionStorage.getItem("userRole");

//     if (encryptedUserEmail && encryptedUserName && encryptedUserRole && encryptionKey) {
//       const userEmail = CryptoJS.AES.decrypt(encryptedUserEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
//       const userName = CryptoJS.AES.decrypt(encryptedUserName, encryptionKey).toString(CryptoJS.enc.Utf8);
//       const userRole = CryptoJS.AES.decrypt(encryptedUserRole, encryptionKey).toString(CryptoJS.enc.Utf8);

//       setUserData({ email: userEmail, name: userName, role: userRole });
//     }
//   }, []);

//   return (
//         <div className="p-8 w-full bg-[#F7F9EB]">
//           <Nav />
//           <div className="flex flex-row space-x-11 space-y-10">
//             {/* Left side */}
//             <div className="w-2/3">
//               {/* First row - Welcome back and role */}
//               <div className="flex justify-between  items-center mb-8">
//                 <div className="text-2xl">Welcome back, {userData.name}</div>
//                 <div className="text-lg">Role: {userData.role}</div>
//               </div>
    
//               {/* Second row - 3 boxes */}
//               <div className="flex flex-row  space-x-4 mb-8">
//                 <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 1</div>
//                 <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 2</div>
//                 <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 3</div>
    
//               </div>
    
//               {/* Third row - Single box */}
//               <div className="w-full flex flex-col rounded-[15px] p-4 h-[294px] mb-10 bg-white shadow-md">
//                 <div>Customers numbers</div> 
//                 <div className="w-full p-4 rounded-[10px] bg-white shadow-md">Website Detail 1</div>
    
//                 </div>
//               <div className='flex flex-row space-x-3'>
//               <div className="w-full flex flex-col p-4 h-[294px] rounded-[15px]  bg-white shadow-md">
//                 <div>Customers numbers</div> 
//                 <div className="w-full p-4 bg-white shadow-md">Website Detail 2</div>
    
//                 </div><div className="w-full flex flex-col p-4 h-[294px] bg-white shadow-md">
//                 <div>Customers numbers</div> 
//                 <div className="w-full p-4 bg-white shadow-md">Website Detail 2</div>
    
//                 </div>
//               </div>
//             </div>
    
//             {/* Right side */}
//             <div className="w-1/3  h-full">
//               {/* Content for the right side */}
//               <div className="flex flex-col space-y-4 ">
                
//                 <div className="w-full p-4 mt-5 bg-white rounded-[15px] shadow-md h-[238px]">
//                   <MapComponent className="h-full w-full"/>
//                 </div>
//                 <div className="w-full p-4 rounded-[15px] max-h-[560px] overflow-hidden overflow-y-auto bg-white shadow-md h-auto">
//                   <div>Website Detail 1</div>
//               <DashboardItemCard  name={"hello"} rating={3} image={dummy}/>
//               <DashboardItemCard  name={"hello"} rating={3} image={dummy}/>
//               <DashboardItemCard  name={"hello"} rating={3} image={dummy}/>
//               <DashboardItemCard  name={"hello"} rating={3} image={dummy}/>
//               <DashboardItemCard  name={"hello"} rating={3} image={dummy}/>
//               <DashboardItemCard  name={"hello"} rating={3} image={dummy}/>
//               <DashboardItemCard  name={"hello"} rating={3} image={dummy}/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     };

// export default Content;


import React, { useState, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Nav from "../DashboardNavbar";
import MapComponent from '../MapComponent';
import DashboardItemCard from '../../cards/DashboardItemCard ';
import dummy from "../../../assets/images/back2.jpg";

const ContentDashboard = () => {
  const [userData, setUserData] = useState({ email: "", name: "", role: "" });

  useEffect(() => {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

    // Decrypt data stored in sessionStorage
    const encryptedUserEmail = sessionStorage.getItem("userEmail");
    const encryptedUserName = sessionStorage.getItem("userName");
    const encryptedUserRole = sessionStorage.getItem("userRole");

    if (encryptedUserEmail && encryptedUserName && encryptedUserRole && encryptionKey) {
      const userEmail = CryptoJS.AES.decrypt(encryptedUserEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
      const userName = CryptoJS.AES.decrypt(encryptedUserName, encryptionKey).toString(CryptoJS.enc.Utf8);
      const userRole = CryptoJS.AES.decrypt(encryptedUserRole, encryptionKey).toString(CryptoJS.enc.Utf8);

      setUserData({ email: userEmail, name: userName, role: userRole });
    }
  }, []);

  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <Nav />
      <div className="flex flex-row space-x-11 space-y-10">
        <div className="w-2/3">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl">Welcome back, {userData.name}</div>
            <div className="text-lg">Role: {userData.role}</div>
          </div>
          <div className="flex flex-row space-x-4 mb-8">
            <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 1</div>
            <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 2</div>
            <div className="w-full h-[154px] rounded-[15px] p-4 bg-white shadow-md">Website Detail 3</div>
          </div>
          <div className="w-full flex flex-col rounded-[15px] p-4 h-[294px] mb-10 bg-white shadow-md">
            <div>Customers numbers</div>
            <div className="w-full p-4 rounded-[10px] bg-white shadow-md">Website Detail 1</div>
          </div>
          <div className="flex flex-row space-x-3">
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

        <div className="w-1/3 h-full">
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
