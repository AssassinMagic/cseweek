import React from 'react';
import { Link } from 'react-router-dom';
// --- UPDATED to match your file names ---
import CountdownTimer from '../components/countDownTimer.jsx';
import LiveRSVP from '../components/liveRSVP.jsx';
// ----------------------------------------

export default function Home() {
  const eventStartDate = new Date('2026-04-20T11:00:00'); 

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center text-white px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
        CSE Week 2026
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl font-light mb-6" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
        The event starts in:
      </p>
      
      <CountdownTimer targetDate={eventStartDate} />
      
      <LiveRSVP />
      
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link
          to="/rsvp"
          className="px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all"
        >
          RSVP Now
        </Link>
        <Link
          to="/sponsor"
          className="px-8 py-3 text-lg font-bold text-gray-900 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition-all"
        >
          Become a Sponsor
        </Link>
      </div>
    </div>
  );
}