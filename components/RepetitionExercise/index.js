import React, { useState } from "react";

function RepetitionExercise({ name }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>{name}</h3>
      <p>Repetitions: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default RepetitionExercise;
