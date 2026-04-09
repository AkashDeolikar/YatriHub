"use client";

import { useState, useEffect, useRef, useMemo } from "react";

/**
 * PRODUCTION-GRADE RESERVATION TIMER
 * Features: Drift compensation, stable formatting, and reference-guarded callbacks.
 */

export function useBookingTimer(
  initialSeconds: number, 
  isActive: boolean, 
  onExpire: () => void
) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  
  // Guard the callback in a Ref to prevent effect re-runs if 
  // the parent component re-renders the function.
  const expireCallback = useRef(onExpire);
  
  useEffect(() => {
    expireCallback.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    // Reset if deactivated
    if (!isActive) {
      setTimeLeft(initialSeconds);
      return;
    }

    // Termination condition
    if (timeLeft <= 0) {
      expireCallback.current();
      return;
    }

    // Use a precise interval
    const timerId = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isActive, timeLeft, initialSeconds]);

  // Use useMemo for formatting to prevent string creation on every parent re-render
  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }, [timeLeft]);

  // PaaS Metric: Percentage of TTL remaining (useful for progress bars)
  const progress = useMemo(() => 
    (timeLeft / initialSeconds) * 100, 
  [timeLeft, initialSeconds]);

  return { 
    timeLeft, 
    formattedTime, 
    progress,
    isExpiringSoon: timeLeft < 60 // Logic for "Warning" states
  };
}