import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">CSEWeek.org</h3>
            <p>An annual celebration of science, engineering and community.</p>
            <p className="mt-4">&copy; {new Date().getFullYear()} CSEWeek. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/events" className="hover:text-white">Events</Link></li>
              <li><Link to="/sponsor" className="hover:text-white">Sponsor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/cseweek/" className="hover:text-white">Instagram</a>
              <a href="https://plumbbob.umn.edu/" className="hover:text-white">Plumb Bob</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}