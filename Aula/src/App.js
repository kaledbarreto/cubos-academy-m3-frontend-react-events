import { useState } from 'react';

function Tarefa(props) {
  return (
    <li>
      <span
        onClick={() => props.handleComplete(props.id)}
        style={{ textDecoration: props.completa ? 'line-through' : '' }}
      >
        {props.children}
      </span>
      <button onClick={() => props.handleDelete(props.id)}>X</button>
    </li>
  )
}

function App() {
  const [tarefas, setTarefas] = useState([]);

  console.log(tarefas);

  function handleKeyDown(event) {
    if (event.key !== 'Enter') return;

    const novasTarefas = [...tarefas, { id: Math.random(), texto: event.target.value, completa: false }];

    setTarefas(novasTarefas);

    event.target.value = '';
  }

  function handleDelete(id) {
    const novasTarefas = tarefas.filter(function (tarefa) {
      return tarefa.id !== id;
    });

    setTarefas(novasTarefas);
  }

  function handleComplete(id) {
    const novasTarefas = [...tarefas];

    const tarefaCompletada = novasTarefas.find(function (tarefa) {
      return tarefa.id === id;
    });
    tarefaCompletada.completa = !tarefaCompletada.completa;

    setTarefas(novasTarefas);
  }

  return (
    <div className="App">
      <div>
        <input type="text" onKeyDown={handleKeyDown} />
        <ul>
          {tarefas.map(function (tarefa) {
            return (
              <Tarefa
                key={tarefa.id}
                id={tarefa.id}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
                completa={tarefa.completa}
              >
                {tarefa.texto}
              </Tarefa>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
