import React, { useState } from "react";

function RunningExercise({ name }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // Timer logic
  React.useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Record a lap
  const recordLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div>
      <h3>{name}</h3>
      <p>Time: {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={recordLap} disabled={!isRunning}>Record Lap</button>
      <button onClick={() => { setIsRunning(false); setTime(0); setLaps([]); }}>Reset</button>

      {/* Display Lap Times */}
      {laps.length > 0 && (
        <div>
          <h4>Lap Times</h4>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>Lap {index + 1}: {String(Math.floor(lap / 60)).padStart(2, "0")}:{String(lap % 60).padStart(2, "0")}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RunningExercise;
