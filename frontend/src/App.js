import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const API_URL = 'http://localhost:3001/tarefas';  // Variável para URL da API
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [concluida, setConcluida] = useState(false);

  // Função para buscar todas as tarefas (GET)
  const carregarTarefas = async () => {
    try {
      const response = await axios.get(API_URL);
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    carregarTarefas();
  }, []);

  // Função para adicionar uma nova tarefa (POST)
  const addTarefa = async () => {
    try {
      const response = await axios.post(API_URL, { descricao, concluida });
      setTarefas([...tarefas, response.data]);
      setDescricao('');
      setConcluida(false);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  // Função para alternar status de tarefa (PUT)
  const toggleTarefa = async (id, concluidaAtual) => {
    try {
      await axios.put(`${API_URL}/${id}`, { concluida: !concluidaAtual });
      setTarefas(
        tarefas.map((tarefa) =>
          tarefa.id === id ? { ...tarefa, concluida: !concluidaAtual } : tarefa
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  // Função para excluir uma tarefa (DELETE)
  const deleteTarefa = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
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
      <p>Para que os testes funcionem, é necessário apagar todas as tarefas existentes.</p>
      <ul>
        {tarefas.length === 0 && <h3>Nenhuma tarefa cadastrada</h3>}
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.concluida ? 'bg-completed' : 'bg-pending'}>
            <span>
              {tarefa.descricao} - {tarefa.concluida ? 'Concluída' : 'Pendente'}
            </span>
            <button onClick={() => toggleTarefa(tarefa.id, tarefa.concluida)} className='change-status-button'>
              Alterar Status
            </button>
            <button onClick={() => deleteTarefa(tarefa.id)} className='delete-button'>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
