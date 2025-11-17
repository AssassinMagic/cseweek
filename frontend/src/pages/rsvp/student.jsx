import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// This is your LIVE API URL
const API_URL = 'https://kayvhqw889.execute-api.us-east-2.amazonaws.com/Prod/rsvp';

export default function StudentRSVP() {
  // --- STATE HOOKS to manage form data ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');

  // --- STATE HOOKS for submission feedback ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop browser from refreshing
    
    setIsSubmitting(true);
    setIsError(false);
    setMessage('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          school: school,
          rsvp_type: 'student' // Send a type so we know what form this was
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error('An error occurred. Please try again.');
      }
      
      // Success!
      const data = await response.json();
      console.log('Success:', data);
      setMessage('RSVP successful! We look forward to seeing you.');
      
      // Clear the form
      setName('');
      setEmail('');
      setSchool('');

    } catch (error) {
      console.error('Submission error:', error);
      setIsError(true);
      setMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
      <div className="max-w-lg mx-auto">
        <div className="text-sm mb-2">
          <Link to="/rsvp" className="text-blue-600 hover:underline">&larr; Back to RSVP options</Link>
        </div>
        <h1 className="text-4xl font-bold mb-6">Student RSVP</h1>
        
        {/* --- Updated <form> tag --- */}
        <form className="w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          
          {/* --- Name Input --- */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">Full Name</label>
            <input 
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
              id="name" 
              type="text" 
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          
          {/* --- Email Input --- */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input 
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
              id="email" 
              type="email" 
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* --- School Input --- */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="school">School / University</label>
            <input 
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
              id="school" 
              type="text" 
              placeholder="University of..."
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          
          {/* --- Submit Button --- */}
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
          
          {/* --- Success/Error Message --- */}
          {message && (
            <div className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}