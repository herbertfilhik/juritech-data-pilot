import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const environment = process.env.REACT_APP_ENVIRONMENT;
  const baseURL = environment === "DEV" ? process.env.REACT_APP_DEV : process.env.REACT_APP_PRD;  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let url; // Vamos definir a URL baseada na condição do ambiente
    if (environment === "DEV") {
      url = `${baseURL}/login`; // Se em desenvolvimento, usa a baseURL
    } else {
      url = `/login`; // Se não, usa uma rota relativa
    }
  
    console.log('URL:', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      console.log('Login bem-sucedido:', data);
      localStorage.setItem('token', data.token); // Armazena o token no localStorage
      navigate('/'); // Redireciona para a página inicial
    } else {
      alert(data.message || 'Falha no login');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 class="login-title">Login JuriTech</h2>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
