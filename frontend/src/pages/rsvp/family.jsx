import React from 'react';
import { Link } from 'react-router-dom';

export default function FamilyRSVP() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
      <div className="max-w-lg mx-auto">
        <div className="text-sm mb-2">
          <Link to="/rsvp" className="text-blue-600 hover:underline">&larr; Back to RSVP options</Link>
        </div>
        <h1 className="text-4xl font-bold mb-6">Family & Guest RSVP</h1>
        
        <form className="w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          {/* Standard RSVP Fields */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">Full Name</label>
            <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="name" type="text" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="email" type="email" placeholder="your.email@example.com" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="affiliation">I am a...</label>
            <select className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="affiliation">
              <option>Family Member</option>
              <option>Alumni</option>
              <option>Industry Professional</option>
              <option>Community Guest</option>
              <option>Other</option>
            </select>
          </div>

          {/* Optional Donation Section */}
          <div className="my-8 p-4 border-t border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-center">Support CSE Week (Optional)</h3>
            <p className="text-sm text-center mb-4">
              Our event is free for all attendees! Your optional donation helps us fund student projects and keep this tradition going.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button type="button" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 font-bold py-3 rounded-lg transition-colors">$10</button>
              <button type="button" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 font-bold py-3 rounded-lg transition-colors">$25</button>
              <button type="button" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 font-bold py-3 rounded-lg transition-colors">$50</button>
              <button type="button" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 font-bold py-3 rounded-lg transition-colors">Other</button>
            </div>
            {/* You could add logic to show a custom amount field when 'Other' is clicked */}
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Submit Free RSVP
          </button>
        </form>
      </div>
    </div>
  );
}