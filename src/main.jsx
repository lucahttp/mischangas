import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import JobOffer from './JobOffer';
import NewJobOffer from './NewJobOffer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Profile from './Profile';


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/offer" element={<JobOffer />} />
        <Route path="/new" element={<NewJobOffer />} />
        <Route path="/account" element={<Profile/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
