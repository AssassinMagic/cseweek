import React, { useState, useEffect, useCallback } from 'react';
// --- NEW ---
// Import routing components from react-router-dom
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';

// --- Reusable UI Components ---

/**
 * Navigation Bar
 * (No longer needs any props)
 */
const Navbar = () => {
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Sponsors', path: '/sponsor' },
    { name: 'Student Groups', path: '/studentgroups' },
    { name: 'Raffle', path: '/raffle' },
    { name: 'Shop', path: '/shop' },
  ];

  // Call-to-action buttons
  const ctaButtons = [
    { name: 'RSVP', path: '/rsvp', style: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Volunteer', path: '/volunteer', style: 'bg-green-600 hover:bg-green-700' },
    { name: 'Donate', path: '/donate', style: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Site Title */}
          <div className="flex-shrink-0">
            {/* --- MODIFIED --- Changed button to Link */}
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-blue-300 transition-colors"
            >
              CSEWeek.org
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              // --- MODIFIED --- Changed button to Link
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {ctaButtons.map((button) => (
              // --- MODIFIED --- Changed button to Link
              <Link
                key={button.path}
                to={button.path}
                className={`px-4 py-2 rounded-md text-sm font-bold text-white transition-all ${button.style}`}
              >
                {button.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`block h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[...navLinks].map((link) => (
            // --- MODIFIED --- Changed button to Link
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex flex-col items-start px-5 space-y-2">
            {ctaButtons.map((button) => (
              // --- MODIFIED --- Changed button to Link
              <Link
                key={button.path}
                to={button.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-center px-4 py-2 rounded-md text-base font-bold text-white transition-all ${button.style}`}
              >
                {button.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

/**
 * Footer Component
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">CSEWeek.org</h3>
            <p>An annual celebration of computing and community.</p>
            <p className="mt-4">&copy; {new Date().getFullYear()} CSEWeek. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
            <ul className="space-y-1">
              {/* --- MODIFIED --- Changed links to use Router Links */}
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/events" className="hover:text-white">Events</Link></li>
              <li><Link to="/sponsor" className="hover:text-white">Sponsor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Countdown Timer Component
 */
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const TimeSegment = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="text-4xl sm:text-6xl md:text-7xl font-bold text-white bg-black bg-opacity-30 p-4 rounded-lg shadow-xl" style={{ minWidth: '80px', textAlign: 'center' }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-sm sm:text-lg uppercase text-gray-200 mt-2">{label}</div>
    </div>
  );

  return (
    <div className="flex justify-center my-8">
      <TimeSegment value={timeLeft.days} label="Days" />
      <TimeSegment value={timeLeft.hours} label="Hours" />
      <TimeSegment value={timeLeft.minutes} label="Minutes" />
      <TimeSegment value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

/**
 * Simulated Live RSVP Counter
 */
const LiveRSVP = () => {
  const [rsvpCount, setRsvpCount] = useState(1245);

  useEffect(() => {
    const interval = setInterval(() => {
      setRsvpCount((prevCount) => prevCount + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-2xl sm:text-3xl font-light text-white">
        Join <span className="font-bold text-blue-300">{rsvpCount.toLocaleString()}</span> others who have RSVP'd!
      </h3>
    </div>
  );
};

// --- Page Components ---
// (These are all the same, just here for the router)

const Home = () => {
  const eventStartDate = new Date('2026-04-20T11:00:00');

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center text-white px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
        CSE Week 2026
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl font-light mb-6" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
        The event starts in:
      </p>
      <CountdownTimer targetDate={eventStartDate} />
      <LiveRSVP />
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {/* --- MODIFIED --- Changed buttons to Links */}
        <Link
          to="/rsvp"
          className="px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all"
        >
          RSVP Now
        </Link>
        <Link
          to="/sponsor"
          className="px-8 py-3 text-lg font-bold text-gray-900 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition-all"
        >
          Become a Sponsor
        </Link>
      </div>
    </div>
  );
};

const About = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6">About CSE Week</h1>
    <p className="text-lg mb-4">
      CSE Week is an annual week-long celebration...
    </p>
  </div>
);

const RSVP = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6">RSVP for CSE Week</h1>
    <form className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      {/* Form fields... */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="name">Full Name</label>
        <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="name" type="text" placeholder="Your Name" />
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
        Submit RSVP
      </button>
    </form>
  </div>
);

const Volunteer = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6">Volunteer for CSE Week</h1>
    <p className="text-lg mb-6 max-w-2xl mx-auto text-center">
      CSE Week is powered by amazing volunteers like you!
    </p>
    {/* Volunteer form... */}
  </div>
);

const Donate = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6 text-center">Support CSE Week</h1>
    {/* Donation form... */}
  </div>
);

const Sponsor = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6">Become a Sponsor</h1>
    <p className="text-lg mb-4">
      Partner with CSE Week to gain unparalleled access...
    </p>
  </div>
);

const StudentGroups = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6">Participating Student Groups</h1>
  </div>
);

const Raffle = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6">CSE Week Raffle</h1>
  </div>
);

const Events = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6">Event Schedule</h1>
  </div>
);

const Shop = () => (
  <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 className="text-4xl font-bold mb-6">CSE Week Merch</h1>
  </div>
);

// --- NEW ---
/**
 * The Layout component acts as the "shell" for all pages.
 * It includes the Navbar, Footer, and background video logic.
 * The <Outlet /> component renders the specific page (Home, About, etc.)
 */
const Layout = () => {
  const [theme, setTheme] = useState('light');
  const location = useLocation(); // Get current URL
  const isHome = location.pathname === '/'; // Check if we are on the home page

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Determine page wrapper class. Home page is full-bleed, others are not.
  const pageWrapperClass = isHome ? "" : "bg-white dark:bg-gray-900";
  
  return (
    <div className={`relative min-h-screen flex flex-col font-sans ${theme}`}>
      
      {/* Background Video - ONLY rendered on the home page */}
      {isHome && (
        <>
          <div className="fixed inset-0 w-full h-full z-[-2]">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/rotatingearth.mp4" // Make sure this is in your /public folder
              className="w-full h-full object-cover"
            />
          </div>
          <div className="fixed inset-0 bg-black/60 z-[-1]"></div>
        </>
      )}

      {/* Navbar is always visible */}
      <Navbar />
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-16 right-4 z-50 p-2 bg-gray-700 text-white rounded-full shadow-lg"
        aria-label="Toggle dark mode"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Main Page Content - flex-grow ensures it fills available space */}
      {/* --- MODIFIED --- */}
      {/* <Outlet /> renders the active child route (Home, About, etc.) */}
      <main className={`flex-grow ${pageWrapperClass}`}>
        <Outlet />
      </main>

      {/* Footer is always visible */}
      <Footer />
    </div>
  );
};


/**
 * Main Application Component
 * This is now responsible for setting up the router.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* This is the "Layout Route". It renders the Layout component.
          All other pages are "nested" inside it as children.
          This makes the Navbar and Footer appear on every page.
        */}
        <Route path="/" element={<Layout />}>
          {/* index={true} means this is the default child route for "/" */}
          <Route index element={<Home />} />
          
          {/* All other pages */}
          <Route path="about" element={<About />} />
          <Route path="rsvp" element={<RSVP />} />
          <Route path="volunteer" element={<Volunteer />} />
          <Route path="donate" element={<Donate />} />
          <Route path="sponsor" element={<Sponsor />} />
          <Route path="studentgroups" element={<StudentGroups />} />
          <Route path="raffle" element={<Raffle />} />
          <Route path="events" element={<Events />} />
          <Route path="shop" element={<Shop />} />
          
          {/* A "catch-all" 404 page could be added here later */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}