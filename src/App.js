import React, { useState } from "react";
import RepetitionExercise from "./components/RepetitionExercise";
import DurationExercise from "./components/DurationExercise";
import RunningExercise from "./components/RunningExercise";

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const exercises = [
    { name: "Push-Ups", type: "repetition" },
    { name: "Jumping Jacks", type: "duration" },
    { name: "Squats", type: "repetition" },
    { name: "Plank", type: "duration" },
    { name: "Running", type: "running" },  // New Running Exercise
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Exercise Tracker</h1>

      {/* Show menu if no exercise is selected */}
      {!selectedExercise && (
        <div>
          <h2>Select an Exercise</h2>
          {exercises.map((exercise) => (
            <button
              key={exercise.name}
              onClick={() => setSelectedExercise(exercise)}
              style={{ margin: "10px", padding: "10px" }}
            >
              {exercise.name}
            </button>
          ))}
        </div>
      )}

      {/* Show the selected exercise component */}
      {selectedExercise && (
        <div>
          <h2>{selectedExercise.name}</h2>
          {selectedExercise.type === "repetition" ? (
            <RepetitionExercise name={selectedExercise.name} />
          ) : selectedExercise.type === "duration" ? (
            <DurationExercise name={selectedExercise.name} />
          ) : selectedExercise.type === "running" ? (
            <RunningExercise name={selectedExercise.name} /> // Corrected condition
          ) : null}

          <button onClick={() => setSelectedExercise(null)}>Back</button>
        </div>
      )}
    </div>
  );
}

export default App;
