import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Certifique-se de que o caminho está correto

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao JuriTech - Data Pilot</h1>
      <Link to="/menu" className="btn btn-primary link-vertical">Menu</Link>
      <Link to="/upload" className="btn btn-primary link-vertical">Realizar Upload da Operação</Link>
      <Link to="/fluxo" className="btn btn-primary link-vertical">Acompanhar Serviço</Link>
      <Link to="/excluiracompservico" className="btn btn-primary link-vertical">Excluir Tabela da Operação</Link>
    </div>
  );
}

export default Home;
