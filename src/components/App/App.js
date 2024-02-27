import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home.js'; // Ajuste para o caminho correto
import UploadForm from '../UploadForm/UploadForm.js'; // Ajuste para o caminho correto
import AcompanhamentoServico from '../AcompanhamentoServico/AcompanhamentoServico.js'; // Ajuste para o caminho correto
import ExcluirTabelaOperacao from '../Exclusao/ExcluirTabelaOperacao.js'; // Ajuste para o caminho correto
import Login from '../Login/Login.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/fluxo" element={<AcompanhamentoServico />} />
        <Route path="/excluiracompservico" element={<ExcluirTabelaOperacao />} />
        <Route path="/login" element={<Login />} />

        {/* Defina outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
