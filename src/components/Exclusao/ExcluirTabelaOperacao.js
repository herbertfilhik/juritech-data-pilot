import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExcluirTabelaOperacao.css';
import axios from 'axios';

const ExcluirTabelaOperacao = ({ setDados }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const navigate = useNavigate();

  const abrirModal = () => setModalVisivel(true);
  const fecharModal = () => setModalVisivel(false);

const confirmarExclusao = async () => {
  try {
    const response = await axios.delete('http://localhost:3001/api/documentos');
    if (response.status === 200) {
      alert(response.data); // ou uma mensagem de sucesso personalizada
      setDados([]); // Limpa os dados no estado local
    } else if (response.status === 404) {
      alert(response.data); // ou uma mensagem personalizada para quando não há dados
    }
    navigate('/'); // Redireciona para a tela inicial após a exclusão
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert(error.response.data); // Mensagem para quando não há dados para excluir
    } else {
      console.error("Erro ao excluir documentos:", error);
      alert("Erro ao excluir documentos."); // ou uma mensagem de erro personalizada
    }
  }
};

  return (
    <div className="excluir-tabela-operacao">
      <button onClick={abrirModal}>
        Excluir Dados da Tabela
      </button>
      <button onClick={() => navigate('/')}>
        Voltar à tela inicial
      </button>
      {modalVisivel && (
        <div className="modal-confirmacao">
          <p>Você realmente quer excluir a tabela de operação?</p>
          <button onClick={confirmarExclusao}>
            Prosseguir com Exclusão
          </button>
          <button onClick={fecharModal}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ExcluirTabelaOperacao;
