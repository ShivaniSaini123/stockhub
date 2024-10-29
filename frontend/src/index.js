import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './landing_page/home/HomePage';
import Main from './landing_page/Dashboard/Main'; // Assuming you have a Dashboard component
import { Home } from '@mui/icons-material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Main />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);

