import { useState, useEffect } from "react";

export function useBookingTimer(initialTime: number, isActive: boolean, onExpire: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(initialTime);
      return;
    }
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isActive, onExpire, initialTime]);

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = String(timeLeft % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return { timeLeft, formatTime };
}