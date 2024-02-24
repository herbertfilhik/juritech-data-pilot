// AcompanhamentoServico.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input } from 'antd';

const AcompanhamentoServico = () => {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para buscar dados filtrados
  const buscarDadosFiltrados = async (filtro = '2.023.003') => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/acompanhamentoServico?filtro=${filtro}`);
      // Atualize o estado com os dados recebidos
      setDados(response.data.map(item => ({
        key: item._id, // Supondo que cada item tem um _id
        controleTarget: item.dados['Controle Target'],
        // ...mapear outras propriedades conforme necessário
      })));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
    setLoading(false);
  };

  // Efeito para buscar dados quando o componente é montado
  useEffect(() => {
    buscarDadosFiltrados(filtro);
  }, []);

  // Efeito para buscar dados quando o valor do filtro muda
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      buscarDadosFiltrados(filtro);
    }, 500); // Delay de 500ms para evitar chamadas excessivas à API

    return () => clearTimeout(delayDebounceFn);
  }, [filtro]);

  // Definição das colunas
  const columns = [
    {
      title: 'Controle Target',
      dataIndex: 'controleTarget',
      key: 'controleTarget',
    },
    // ...definir outras colunas
  ];

  // Handler para mudança no filtro
  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <div>
      <h1>Acompanhamento de Serviço</h1>
      <Input
        placeholder="Filtrar por Controle Target"
        value={filtro}
        onChange={handleFilterChange}
      />
      <Table
        dataSource={dados}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default AcompanhamentoServico;
