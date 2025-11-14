import React from 'react';

export default function Donate() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center">Support CSE Week</h1>
      <p className="text-lg mb-8 max-w-2xl mx-auto text-center">
        Your donation helps us fund student projects, bring in world-class speakers, and provide food and resources to all our attendees. Every contribution makes a difference!
      </p>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-center">Make a Donation</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 font-bold py-4 rounded-lg transition-colors">$25</button>
          <button className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 font-bold py-4 rounded-lg transition-colors">$50</button>
          <button className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 font-bold py-4 rounded-lg transition-colors">$100</button>
          <button className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 font-bold py-4 rounded-lg transition-colors">$250</button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="custom-amount">Or enter a custom amount:</label>
          <input className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" id="custom-amount" type="number" placeholder="$" />
        </div>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors">
          Donate Now
        </button>
      </div>
    </div>
  );
}