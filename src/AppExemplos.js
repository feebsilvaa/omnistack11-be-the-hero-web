import React, { useState } from 'react';
import Header from "./Header";

function App() {
  // usando estado para modificar valores
  const [ counter, setCounter ] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  }

  const decrement = () => {
    setCounter(counter - 1);
  }

  return (
    <div>
      <Header>
        Contador: { counter }
      </Header>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
    </div>
  );
}

export default App;
