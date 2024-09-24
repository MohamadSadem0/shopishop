  // import React from 'react';
  // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  // import { Provider } from 'react-redux';
  // import store from './redux/store';
  // import Login from './pages/auth/login/Login';
  // import Signup from './pages/auth/signup/Signup';
  // import LandingPage from './pages/landingPage/LandingPage';
  // import Dashboardpage from './pages/dashboard/Dashboardpage';
  // import UnauthorizedPage from './pages/UnauthorizedPage';
  // import Profile from './pages/profile/Profile';
  // import ProtectedRoute from './components/ProtectedRoute';
  // import prote

  // const App = () => {
  //   return (
      // <Provider store={store}>
      //   <Router>
      //     <div className="">
      //       {/* Define Routes for the application */}
      //       <Routes>
      //         <Route path="/" element={<LandingPage  />} />
      //         <Route path="/login" element={<Login />} />
      //         <Route path="/signup" element={<Signup />} />
      //         <Route path="/d" element={<Dashboardpage />} />

      //       </Routes>
      //     </div>
      //   </Router>
      // </Provider>


      // src/App.js

  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { Provider } from 'react-redux';
  import store from './redux/store';
  import Login from './pages/auth/login/Login';
  import Signup from './pages/auth/signup/Signup';
  import LandingPage from './pages/landingPage/LandingPage';
  import Dashboardpage from './pages/dashboard/Dashboardpage';
  import UnauthorizedPage from './pages/UnauthorizedPage';
  import Profile from './pages/profile/Profile';
  import ProtectedRoute from './components/ProtectedRoute';
  import { useEffect } from 'react';
  import { useSelector } from 'react-redux';

  const App = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
      console.log('App loaded, isAuthenticated:', isAuthenticated);
      
    }, [isAuthenticated]);

    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute allowedRoles={['superadmin', 'merchant']} component={Dashboardpage} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute allowedRoles={['customer']} component={Profile} />}
          />
        </Routes>
      </Router>
    );
  };

  export default App;
