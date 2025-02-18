import React, { useState, useEffect } from "react";

function DurationExercise({ name }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <h3>{name}</h3>
      <p>Time: {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}</p>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={() => { setIsRunning(false); setTime(0); }}>Reset</button>
    </div>
  );
}

export default DurationExercise;
