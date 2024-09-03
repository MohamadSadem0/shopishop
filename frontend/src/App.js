import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="">
          {/* Define Routes for the application */}
          <Routes>
            <Route path="/" element={<LandingPage  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
