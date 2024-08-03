import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import JobOffer from './JobOffer';
import NewJobOffer from './NewJobOffer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Profile from './Profile';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Router>
        <Routes>
      <Route element={<Layout/>}>
          <Route exact path="/" element={<App />} />
          <Route path="/offer" element={<JobOffer />} />
          <Route path="/new" element={<NewJobOffer />} />
          <Route path="/account" element={<Profile />} />
          <Route exact path="/" element={<App />} />
      </Route>
      
        </Routes>
    </Router>
  </React.StrictMode>
);
