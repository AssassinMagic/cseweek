import React, { useState, useEffect, useCallback } from 'react';

/**
 * Countdown Timer Component
 * @param {Date} targetDate - The date and time the event starts
 */
export default function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Helper component for each time unit
  const TimeSegment = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="text-4xl sm:text-6xl md:text-7xl font-bold text-white bg-black bg-opacity-30 p-4 rounded-lg shadow-xl" style={{ minWidth: '80px', textAlign: 'center' }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-sm sm:text-lg uppercase text-gray-200 mt-2">{label}</div>
    </div>
  );

  return (
    <div className="flex justify-center my-8">
      <TimeSegment value={timeLeft.days} label="Days" />
      <TimeSegment value={timeLeft.hours} label="Hours" />
      <TimeSegment value={timeLeft.minutes} label="Minutes" />
      <TimeSegment value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}