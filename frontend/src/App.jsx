import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the layout and all your pages
// Note the paths and file casings now match your image
import Layout from './components/Layout.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import RSVP from './pages/rsvp.jsx'; // This is the selection page

// --- UPDATED to match your /pages/rsvp/ folder ---
import StudentRSVP from './pages/rsvp/student.jsx'; 
import FamilyRSVP from './pages/rsvp/family.jsx';
// --------------------------------------------------

import Volunteer from './pages/volunteer.jsx';
import Donate from './pages/donate.jsx';
import Sponsor from './pages/sponsor.jsx';
import StudentGroups from './pages/studentgroups.jsx';
// --- FIX --- Removed import for 'raffle.jsx' as it's not in your directory
// import Raffle from './pages/raffle.jsx'; 
import Events from './pages/events.jsx';
import Shop from './pages/shop.jsx';

/**
 * Main Application Component
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          
          {/* These routes map to your new file structure */}
          <Route path="rsvp" element={<RSVP />} /> 
          <Route path="rsvp/student" element={<StudentRSVP />} /> 
          <Route path="rsvp/family" element={<FamilyRSVP />} /> 

          <Route path="volunteer" element={<Volunteer />} />
          <Route path="donate" element={<Donate />} />
          <Route path="sponsor" element={<Sponsor />} />
          <Route path="studentgroups" element={<StudentGroups />} />
          {/* --- FIX --- Removed the route for 'raffle' */}
          {/* <Route path="raffle" element={<Raffle />} /> */}
          <Route path="events" element={<Events />} />
          <Route path="shop" element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}