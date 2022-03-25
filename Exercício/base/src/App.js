import { useState } from 'react';
import close from '../src/assets/delete.svg';

function Tarefa(props) {
  return (
    <li>
      <span
        onClick={() => props.handleComplete(props.id)}
        style={{
          color: props.completa ? '#D1D2DA' : '',
          textDecoration: props.completa ? 'line-through' : ''
        }}
      >
        {props.children}
      </span>
      <img onClick={() => props.handleDelete(props.id)} src={close} alt="Close" />
    </li >
  )
}

function Menu(props) {
  return (
    <div className="menu-div">
      <span>{props.quantidade} itens restantes</span>
      <div className="md-functions">
        <span className={props.filtro === 'Todos' ? 'color-blue' : ''} onClick={() => props.handleVerificar('Todos')}>Todas</span>
        <span className={props.filtro === 'Ativo' ? 'color-blue' : ''} onClick={() => props.handleVerificar('Ativo')}>Ativas</span>
        <span className={props.filtro === 'Pendente' ? 'color-blue' : ''} onClick={() => props.handleVerificar('Pendente')} >Completada</span>
      </div>
      <span onClick={() => props.handleDeleteComplete()} className="clear-completed">Limpar Completadas</span>
    </div>
  )
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState('Todos');

  const tarefasIncompletas = tarefas.filter((tarefa) => !tarefa.completa);
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === 'Ativo') {
      return !tarefa.completa;
    } else if (filtro === 'Pendente') {
      return tarefa.completa;
    } else {
      return tarefa;
    }
  }
  );

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

  function handleVerificar(filtro) {
    if (filtro === 'Todos') {
      setFiltro('Todos');
    } else if (filtro === 'Pendente') {
      setFiltro('Pendente');
    } else {
      setFiltro('Ativo');
    }
  }

  function handleDeleteComplete() {
    const novasTarefas = tarefas.filter(function (tarefa) {
      return tarefa.completa === false;
    });
    setTarefas(novasTarefas);
  }


  return (
    <div className="App">
      <div>
        <h1>TAREFAS</h1>
        <input placeholder="Criar uma nova tarefa" type="text" onKeyDown={handleKeyDown} />
        <ul>
          {tarefasFiltradas.map(function (tarefa) {
            return (
              <Tarefa
                className="Tarefa"
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
        <Menu
          quantidade={tarefasIncompletas.length}
          handleVerificar={handleVerificar}
          handleDeleteComplete={handleDeleteComplete}
          filtro={filtro}
        />
      </div>
    </div>
  );
}

export default App;

