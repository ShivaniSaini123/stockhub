import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './landing_page/home/HomePage';
import Main from './landing_page/Dashboard/Main'; // Assuming you have a Dashboard component
import { Dashboard, Home } from '@mui/icons-material';
import Holdings from './landing_page/Dashboard/Holdings';
import Positions from './landing_page/Dashboard/Positions';
import Orders from './landing_page/Dashboard/Orders';
import WatchList from './landing_page/Dashboard/WatchList';
import ProfilePage from './landing_page/profile/profile';
import Authentication from './landing_page/pages/authentication';
import { AuthProvider } from './landing_page/contexts/AuthContext';
import About from './landing_page/about/About';
import Login from './landing_page/views/users/login.js';
import Signup from './landing_page/views/users/signup.js';
import Logout from './landing_page/views/users/logout.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/*" element={<Main/>} />
        <Route path="profile" element={<ProfilePage/>}/>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/holdings" element={
  <>
    <Holdings />
   <WatchList/>
  </>
} />
        <Route path="/positions" element={<Positions/>} />
        <Route path="/orders" element={<Orders/>} /> */}
        {/* Add more routes as needed */}
      </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>

);