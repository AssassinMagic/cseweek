import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// --- UPDATED to match your file names ---
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
// ----------------------------------------

/**
 * The Layout component acts as the "shell" for all pages.
 */
export default function Layout() {
  const [theme, setTheme] = useState('light');
  const location = useLocation(); 
  const isHome = location.pathname === '/'; 

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

  const pageWrapperClass = isHome ? "" : "bg-white dark:bg-gray-900";
  
  return (
    <div className={`relative min-h-screen flex flex-col font-sans ${theme}`}>
      
      {isHome && (
        <>
          <div className="fixed inset-0 w-full h-full z-[-2]">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/rotatingearth.mp4" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="fixed inset-0 bg-black/60 z-[-1]"></div>
        </>
      )}

      <Navbar />
      
      <button
        onClick={toggleTheme}
        className="fixed bottom-16 right-4 z-50 p-2 bg-gray-700 text-white rounded-full shadow-lg"
        aria-label="Toggle dark mode"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <main className={`flex-grow ${pageWrapperClass}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};