import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import UploadForm from './UploadForm';
import AcompanhamentoServico from './AcompanhamentoServico'; // Corrija o caminho do import se necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/fluxo" element={<AcompanhamentoServico />} />
        {/* Defina outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
