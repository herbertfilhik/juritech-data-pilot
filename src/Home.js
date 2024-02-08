import { Link } from 'react-router-dom';
import './App.css'; // Certifique-se de que este é o caminho correto para o seu arquivo CSS

function Home() {
  return (
    <div>
      <h1>Bem-vindo ao JuriTech - Data Pilot</h1>
      <Link to="/menu" className="btn btn-primary link-vertical">Menu</Link>
      <Link to="/upload" className="btn btn-primary link-vertical">Upload da Planilha de Operação</Link>
      <Link to="/fluxo" className="btn btn-primary link-vertical">Acompanhamento de Serviço</Link>
    </div>
  );
}

export default Home;
