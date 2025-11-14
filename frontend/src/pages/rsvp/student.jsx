import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentRSVP() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
      <div className="max-w-lg mx-auto">
        <div className="text-sm mb-2">
          <Link to="/rsvp" className="text-blue-600 hover:underline">&larr; Back to RSVP options</Link>
        </div>
        <h1 className="text-4xl font-bold mb-6">Student RSVP</h1>
        
        <form className="w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">Full Name</label>
            <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="name" type="text" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="email" type="email" placeholder="your.email@example.com" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="school">School / University</label>
            <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="school" type="text" placeholder="University of..." />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Submit RSVP
          </button>
        </form>
      </div>
    </div>
  );
}