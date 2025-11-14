import React, { useState, useEffect } from 'react';

/**
 * Simulated Live RSVP Counter
 */
export default function LiveRSVP() {
  const [rsvpCount, setRsvpCount] = useState(1245); // Starting count

  useEffect(() => {
    const interval = setInterval(() => {
      setRsvpCount((prevCount) => prevCount + Math.floor(Math.random() * 3) + 1);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-2xl sm:text-3xl font-light text-white">
        Join <span className="font-bold text-blue-300">{rsvpCount.toLocaleString()}</span> others who have RSVP'd!
      </h3>
    </div>
  );
}