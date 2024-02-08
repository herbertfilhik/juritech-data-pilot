import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import UploadForm from './UploadForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        {/* Defina outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
