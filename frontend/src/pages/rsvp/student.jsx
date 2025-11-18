import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// This is your LIVE API URL
const API_URL = 'https://api.cseweek.org/rsvp';

export default function StudentRSVP() {
  // --- STATE HOOKS for form data ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // --- NEW STATE for conditional logic ---
  const [selectedSchool, setSelectedSchool] = useState(''); // "UMNTC", "Other", or ""
  const [otherSchool, setOtherSchool] = useState('');     // Text for "Other"
  const [isCseStudent, setIsCseStudent] = useState(null);  // true, false, or null

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

    // --- Validation for new fields ---
    if (selectedSchool === 'Other' && !otherSchool) {
      setIsError(true);
      setMessage('Please specify your school name.');
      setIsSubmitting(false);
      return;
    }
    if (selectedSchool === 'UMNTC' && isCseStudent === null) {
      setIsError(true);
      setMessage('Please specify if you are a CSE student.');
      setIsSubmitting(false);
      return;
    }

    // --- Combine school data into one field for the backend ---
    let finalSchoolName = '';
    if (selectedSchool === 'UMNTC') {
      finalSchoolName = 'University of Minnesota Twin Cities';
      if (isCseStudent === true) {
        finalSchoolName += ' (CSE Student)';
      } else {
        finalSchoolName += ' (Not CSE Student)';
      }
    } else if (selectedSchool === 'Other') {
      finalSchoolName = otherSchool;
    }
    // --- End of data combining logic ---

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          school: finalSchoolName, // Send our combined string
          rsvp_type: 'student' 
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
      setSelectedSchool('');
      setOtherSchool('');
      setIsCseStudent(null);

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
          
          {/* --- NEW: School Dropdown --- */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="school-select">School / University</label>
            <select
              id="school-select"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              required
            >
              <option value="" disabled>Select an option...</option>
              <option value="UMNTC">University of Minnesota Twin Cities</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* --- NEW: Conditional "Other" Text Input --- */}
          {selectedSchool === 'Other' && (
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="other-school">Please specify your school</label>
              <input 
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
                id="other-school" 
                type="text" 
                placeholder="Your School Name"
                value={otherSchool}
                onChange={(e) => setOtherSchool(e.target.value)}
                required
              />
            </div>
          )}

          {/* --- NEW: Conditional "UMNTC" Checkbox --- */}
          {selectedSchool === 'UMNTC' && (
            <div className="mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-bold mb-2">Are you a CSE student?</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="cse-student" 
                    className="mr-2"
                    checked={isCseStudent === true}
                    onChange={() => setIsCseStudent(true)}
                  /> Yes
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="cse-student" 
                    className="mr-2"
                    checked={isCseStudent === false}
                    onChange={() => setIsCseStudent(false)}
                  /> No
                </label>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                This changes nothing and is used for marketing purposes.
              </p>
            </div>
          )}
          
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