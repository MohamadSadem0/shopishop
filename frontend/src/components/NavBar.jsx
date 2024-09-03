// import React from 'react';
// import Logo from '../assets/icons/logo.svg'

// const Navbar = () => {
//   return (
//     <nav className="w-11/12 bg-[#585649] p-4 rounded-2xl shadow-lg mt-5 mr-10 fixed">
//       <div className="container mr-10 ml-10 flex justify-between items-center ">
//         {/* Logo Section */}
//         <img
//           className="w-40 h-20 "
//           src={Logo}
//           alt="Logo"
//         />

//         {/* Navigation Links */}
//         <div className="hidden md:flex space-x-8 text-white font-['Roboto'] text-lg">
//           <a href="#" className="relative group">
//             Home
//             <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//           </a>
//           <a href="#" className="relative group">
//             Order
//             <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//           </a>
//           <a href="#" className="relative group">
//             Shop
//             <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//           </a>
//           <a href="#" className="relative group">
//             About Us
//             <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//           </a>
//         </div>

//         {/* Right Section (Location and Sign In) */}
//         <div className="flex items-center space-x-6">
//           {/* Location */}
//           <div className="flex items-center space-x-2 text-white">
//             <div className="w-4 h-4 border-2 border-white rounded-full relative flex justify-center items-center">
//               <div className="w-2 h-2 border-2 border-white rounded-full"></div>
//             </div>
//             <span className="text-[#ff0008] text-lg">Location</span>
//           </div>

//           {/* Sign In */}
//           <a href="#" className="text-white text-lg hover:text-[#fede00] transition-colors duration-300">
//             Sign In
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import Logo from '../assets/icons/logo.svg';

const Navbar = () => {
  return (
    <nav className="w-[95%] bg-[#585649] h-[103] p-4 rounded-2xl shadow-lg fixed top-0 left-1/2 transform -translate-x-1/2 z-50  mt-5">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo Section */}
        <img
          className="h-[30] w-[30]"
          src={Logo}
          alt="Logo"
        />

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-white font-['Roboto'] text-lg">
          <a href="#" className="relative group">
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="relative group">
            Order
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="relative group">
            Shop
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="relative group">
            About Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </div>

        {/* Right Section (Location and Sign In) */}
        <div className="flex items-center space-x-6">
          {/* Location */}
          <div className="flex items-center space-x-2 text-white">
            <div className="w-4 h-4 border-2 border-white rounded-full relative flex justify-center items-center">
              <div className="w-2 h-2 border-2 border-white rounded-full"></div>
            </div>
            <span className="text-[#ff0008] text-lg">Location</span>
          </div>

          {/* Sign In */}
          <a href="#" className="text-white text-lg hover:text-[#fede00] transition-colors duration-300">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
