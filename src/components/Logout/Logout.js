import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Certifique-se de que o caminho para o arquivo CSS está correto

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você inclui a lógica de logout (por exemplo, limpar o localStorage)
    localStorage.removeItem('token');

    // Atualizar o estado global de autenticação, se estiver usando Context ou Redux (opcional)

    // Redireciona o usuário
    navigate('/login');
  };

  return (
    <div className="logout-container">
      <h2>Sair do Sistema</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Logout;
