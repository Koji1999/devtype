import { useState, useEffect } from "react";

export function useTimer () {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning (false);
  const reset = () => { setIsRunning(false); setTime(0); };

  return { time, start, stop, reset };
}