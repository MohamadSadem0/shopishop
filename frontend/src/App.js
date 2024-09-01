import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          {/* Define Routes for the application */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
