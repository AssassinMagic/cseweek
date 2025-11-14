import React from 'react';
import { Link } from 'react-router-dom';

export default function RSVP() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center">RSVP for CSE Week</h1>
      <p className="text-lg mb-10 text-center max-w-2xl mx-auto">
        We're excited to have you join us! Please let us know who you are so we can get you to the right place.
      </p>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Option */}
        <Link
          to="/rsvp/student"
          className="block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-500 transition-all transform hover:-translate-y-1"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Student
          </h2>
          <p className="text-lg mb-6">
            Register as a current student from any university or school.
          </p>
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Register for Free &rarr;
          </span>
        </Link>

        {/* Family/Guest Option */}
        <Link
          to="/rsvp/family"
          className="block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-green-500 dark:hover:border-green-500 transition-all transform hover:-translate-y-1"
        >
          <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
            Family & Guests
          </h2>
          <p className="text-lg mb-6">
            Register as a family member, alumni, industry professional, or community guest.
          </p>
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            Register for Free &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}