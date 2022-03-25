import { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0);

  function handleClick() { //Manejar o click (Função somente para chamar uma função)
    setContador(contador + 1);
  }

  return (
    <div className="App">
      <h1>Contador {contador}</h1>
      <button onClick={handleClick}>Contar</button>
    </div>
  );
}

export default App;
