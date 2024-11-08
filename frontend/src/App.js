import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [concluida, setConcluida] = useState(false);

  // Carregar tarefas
  useEffect(() => {
    axios.get('http://localhost:3001/tarefas').then((response) => {
      setTarefas(response.data);
    });
  }, []);

  // Adicionar nova tarefa
  const addTarefa = () => {
    axios.post('http://localhost:3001/tarefas', { descricao, concluida })
      .then((response) => {
        setTarefas([...tarefas, response.data]);
        setDescricao('');
        setConcluida(false);
      });
  };

  return (
    <div className="app-container">
      <h2>Cadastro de Tarefas</h2>
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <label>
        Concluída
        <input
          type="checkbox"
          checked={concluida}
          onChange={() => setConcluida(!concluida)}
        />
      </label>
      <button onClick={addTarefa}>Adicionar Tarefa</button>
      <h3>Lista de Tarefas</h3>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <span className={tarefa.concluida ? 'completed' : 'pending'}>
              {tarefa.descricao} - {tarefa.concluida ? 'Concluída' : 'Pendente'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
