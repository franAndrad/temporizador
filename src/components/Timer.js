import React, { useState, useEffect } from "react";
import './Timer.css'; 

const Timer = () => {
  const calculateTimeLeft = () => {
    // Establece la fecha de finalización del temporizador
    const targetDate = new Date("2023-11-26T00:00:00Z"); // Puedes cambiar esta fecha a tu preferencia
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

    return (
      <div className="timer-container">
        <h1 className="timer-heading">VUELTA A CASA</h1>
        <div className="timer card border-neon">
          <p className="timer-item">{timeLeft.months}m</p>
          <span className="timer-separator">:</span>
          <p className="timer-item">{timeLeft.days}</p>
          <span className="timer-separator">:</span>
          <p className="timer-item">{timeLeft.hours}hs</p>
          <span className="timer-separator">:</span>
          <p className="timer-item">{timeLeft.minutes}min</p>
          <span className="timer-separator">:</span>
          <p className="timer-item">{timeLeft.seconds}seg</p>
        </div>
      </div>
    );
};

export default Timer;
