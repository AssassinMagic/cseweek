import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Navigation Bar
 */
export default function Navbar() {
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
}