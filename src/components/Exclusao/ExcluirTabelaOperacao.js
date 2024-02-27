// ExcluirTabelaOperacao.js Front
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
      alert(response.data);
      setDados([]);
      navigate('/');
    } catch (error) {      
      if (error.response && error.response.status === 404) {
        alert(error.response.data);
      } else {
        // Pode ser um erro de rede ou algo que impediu a resposta de chegar
        //console.error("Erro ao excluir documentos front:", error);
        //alert("Erro ao excluir documentos ou verificar a conexão de rede front.");
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
