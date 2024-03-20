import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-07-24T00:00:00Z");
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      };
    }

    const total = difference;
    const months = Math.floor(total / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (total % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);

    return {
      months,
      days,
      hours,
      minutes,
      seconds,
      total: difference,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const calculateProgress = () => {
    const startDate = new Date("2024-03-24T00:00:00Z");
    const endDate = new Date("2024-07-24T00:00:00Z");
    const now = new Date();

    if (now < startDate) {
      return "0%";
    }

    const elapsedDuration = now - startDate;
    const totalDuration = endDate - startDate;

    let progress = (elapsedDuration / totalDuration) * 100;
    if (progress > 100) {
      progress = 100;
    }

    return progress.toFixed(2) + "%";
  };

  return (
    <div className="timer-container">
      <h1 className="timer-heading">VUELTA A MOLESTAR</h1>
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: calculateProgress() }}
        ></div>
        <div className="progress-percent">{calculateProgress()} completado</div>
      </div>
      <div className="timer card border-neon">
        <p className="timer-item">{timeLeft.months}m</p>
        <span className="timer-separator">:</span>
        <p className="timer-item">{timeLeft.days}d</p>
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
