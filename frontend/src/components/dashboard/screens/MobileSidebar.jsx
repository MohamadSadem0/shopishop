// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faHome, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import styles from './MobileSidebar.module.css';

// const MobileSidebar = ({ setActiveTab }) => {
//   const navigate = useNavigate();

//   const handleNav = (tab) => {
//     setActiveTab(tab);
//     // Optionally close sidebar if it's a sliding type
//   };

//   return (
//     <div className={styles.mobileSidebar}>
//       <FontAwesomeIcon icon={faBars} className={styles.burger} />
//       <button onClick={() => handleNav('dashboard')}>
//         <FontAwesomeIcon icon={faHome} />
//         Dashboard
//       </button>
//       <button onClick={() => handleNav('settings')}>
//         <FontAwesomeIcon icon={faCog} />
//         Settings
//       </button>
//       <button onClick={() => navigate('/')}>
//         <FontAwesomeIcon icon={faSignOutAlt} />
//         Logout
//       </button>
//     </div>
//   );
// };

// export default MobileSidebar;
