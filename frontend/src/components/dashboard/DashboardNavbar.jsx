// import React from 'react';

// const DashboardNavbar = () => {
//   return (
//     <div className="w-[90%] h-16  bg-gray-100 flex justify-between items-center px-8 shadow-lg fixed top-0">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="px-4 py-2 rounded border border-gray-400"
//         />
//       </div>
//       <div className="flex items-center space-x-8">
//         <div className="relative">
//           <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//         </div>
//         <span className="text-lg font-medium">John Doe</span>
//       </div>
//     </div>
//   );
// };

// export default DashboardNavbar;

import React from 'react';
import { FiSun, FiBell } from 'react-icons/fi'; // Icons for light mode and notification

const DashboardNavbar = () => {
  return (
    <div className=" top-0 right-0 h-16 flex justify-between items-center pr-8  w-full">
      {/* Search Input on the Left */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded border border-gray-400"
        />
      </div>
      
      {/* Icons and Profile on the Right */}
      <div className="flex items-center space-x-6">
        {/* Light Mode Icon */}
        <FiSun className="w-6 h-6 cursor-pointer" />

        {/* Notification Icon */}
        <FiBell className="w-6 h-6 cursor-pointer" />

        {/* Profile Picture and Username */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <span className="text-lg font-medium">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
