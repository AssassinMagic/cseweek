import React from 'react';

export default function Volunteer() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6">Volunteer for CSE Week</h1>
      <p className="text-lg mb-6 max-w-2xl mx-auto text-center">
        CSE Week is powered by amazing volunteers like you! Fill out the form below to express your interest, and we'll get in touch with you about opportunities.
      </p>
      <form className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="vol-name">Full Name</label>
          <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="vol-name" type="text" placeholder="Your Name" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="vol-email">Email</label>
          <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="vol-email" type="email" placeholder="your.email@example.com" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="vol-availability">Availability</label>
          <textarea className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="vol-availability" rows="4" placeholder="Let us know when you're available during CSE Week..."></textarea>
        </div>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
          Sign Up to Volunteer
        </button>
      </form>
    </div>
  );
}