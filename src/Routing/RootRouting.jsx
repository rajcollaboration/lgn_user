import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from '../Component/Login/Login';
import Register from '../Component/Register/Register';
import './RootRouting.css';
import ProtectedRoute from './ProtectedRoute';
import Home from '../Pages/Banner/Home';
import Notification from '../Pages/Banner/Notification';
import Predictions from '../Pages/Banner/Prediction';
import Share from '../Pages/Banner/Share';
import Support from '../Pages/Banner/Support';
import Profile from '../Pages/Banner/Profile';
import Navbar from '../Pages/Navbar/Navbar';
import EditProfile from '../Pages/Banner/EditProfile';
import Tournament1 from '../Pages/Tournament1/Tournament1';
// import Tournament2 from '../Pages/Tournament2/Tournament2';

const RootRouting = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
  };

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate replace to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/tournament/:id" element={<Tournament1 />} />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/noti" element={<Notification />} />
            <Route path="/predi" element={<Predictions />} />
            <Route path="/share" element={<Share />} />
            <Route path="/support" element={<Support />} />
            <Route path="/edit" element={<EditProfile />} />
            
            {/* <Route path="/tournament2" element={<Tournament2 />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default RootRouting;
