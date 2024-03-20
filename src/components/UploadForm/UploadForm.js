import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../UploadForm/UploadForm.css';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const environment = process.env.ENVIRONMENT; // 'DEV' ou 'PRD'
  const baseURL = environment === 'DEV' ? process.env.DEV : process.env.PRD;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert('Por favor, selecione um arquivo Excel válido (.xls, .xlsx).');
      event.target.value = ''; // Resetar o campo de arquivo
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Por favor, selecione um arquivo para fazer upload.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      //const response = await fetch('http://localhost:3001/upload', {
      //const response = await fetch('https://juritech-data-pilot-backend-8fc90525fb93.herokuapp.com/upload', {
      const response = await fetch(`${baseURL}/upload`, {  


        method: 'POST',
        body: formData,
      });
    
      setIsLoading(false);
    
      if (response.ok) {
        const data = await response.json();
        console.log("Status da resposta:", response.status);
        alert('Upload bem-sucedido!');
        console.log('Resposta do servidor:', data);
        navigate('/upload'); // Ajuste conforme necessário
      } else if (response.status === 400) {
        // Supondo que o servidor retorne status 400 para arquivos já processados
        const errorData = await response.json();
        console.log("Status da resposta:", response.status);
        alert(errorData.message || 'Este arquivo já foi processado anteriormente.');
      } else {
        // Para outros códigos de status, assuma que é uma falha no upload
        const errorData = await response.json();
        console.log("Status da resposta:", response.status);
        alert(errorData.message || 'Falha no upload do arquivo.');
      }
    } catch (error) {
      setIsLoading(false);
      // Aqui, você captura erros que ocorrem antes de receber uma resposta do servidor, como problemas de rede
      console.error('Erro ao fazer upload do arquivo:', error);
      // Você pode optar por não mostrar um alerta aqui, ou mostrar uma mensagem mais genérica
      // alert('Erro ao fazer upload do arquivo.');
      alert('Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.');
    }
    
  };

  const handleBack = () => {
    navigate(-1); // Isso fará o navegador voltar para a página anterior
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <h1>Faça o Upload da Planilha de Operação na caixa Abaixo e aguarde o Processamento</h1>
      <input type="file" onChange={handleFileChange} disabled={isLoading} />
      <button type="submit" disabled={isLoading}>Upload</button>
      {isLoading && <p>Carregando...</p>}
      <button type="button" onClick={handleBack} disabled={isLoading}>Voltar</button>
    </form>
  );
}

export default UploadForm;
