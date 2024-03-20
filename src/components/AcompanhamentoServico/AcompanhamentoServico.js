// AcompanhamentoServico.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input } from 'antd';
import { Link } from 'react-router-dom';
import './AcompanhamentoServico.css';

const AcompanhamentoServico = () => {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para buscar dados filtrados
  const buscarDadosFiltrados = async (filtro) => {
    setLoading(true);
    try {
      //const response = await axios.get(`http://localhost:3001/api/acompanhamentoServico?filtro=${filtro}`);
      const response = await axios.get(`https://juritech-data-pilot-backend-8fc90525fb93.herokuapp.com/api/acompanhamentoServico?filtro=${filtro}`);
      
      // Atualize o estado com os dados recebidos
      setDados(response.data.map(item => ({
        key: item._id, // Supondo que cada item tem um _id
        controleTarget: item.dados['Controle Target'],
        dtSolicitacao: item.dados['Data de Solicitação'],
        dtInicio: item.dados['Data de Início'], // Added field
        solicitante: item.dados['Solicitante'],
        grupo: item.dados['Grupo'], // Added field
        cliente: item.dados['Cliente'],
        cnpj: item.dados['CNPJ'],
        municipio: item.dados['Município'], // Added field
        uf: item.dados['UF'], // Added field
        deliberacao: item.dados['Deliberação'], // Added field
        atoSocietario: item.dados['Ato Societário'], // Added field
        quantidadeImpressao: item.dados['Quantidade de impressão'], // Added field
        complexidadeProcesso: item.dados['Complexidade do Processo'], // Added field
        setor: item.dados['Setor'],
        executor: item.dados['Executor'],
        servico: item.dados['Serviço'],
        sla: item.dados['SLA'],
        cumprimentoSLA: item.dados['Cumprimento de SLA'],
        dataProtocolo: item.dados['Data do Protocolo'],
        protocolo: item.dados['Protocolo'],
        registro: item.dados['Registro'], // Added field
        status: item.dados['Status'],
        mes: item.dados['MÊS'], // Added field
        periodoProcessual: item.dados['Período Processual'],
        dataFinalizacao: item.dados['Data de Finalização'],
        statusFaturamento: item.dados['STATUS'], // Added field
        nf: item.dados['NF'],
        // ...mapear outras propriedades conforme necessário
      })));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
    setLoading(false);
  };

  // Efeito para buscar dados quando o componente é montado
  /*useEffect(() => {
    buscarDadosFiltrados(filtro);
  }, []);*/

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
  {
    title: 'Data de Solicitação',
    dataIndex: 'dtSolicitacao',
    key: 'dtSolicitacao',
  },
  {
    title: 'Solicitante',
    dataIndex: 'solicitante',
    key: 'solicitante',
  },
  {
    title: 'Cliente',
    dataIndex: 'cliente',
    key: 'cliente',
  },
  {
    title: 'CNPJ',
    dataIndex: 'cnpj',
    key: 'cnpj',
  },
  {
    title: 'Data de Início',
    dataIndex: 'dataInicio',
    key: 'dataInicio',
  },
  {
    title: 'Grupo',
    dataIndex: 'grupo',
    key: 'grupo',
  },
  {
    title: 'Município',
    dataIndex: 'municipio',
    key: 'municipio',
  },
  {
    title: 'UF',
    dataIndex: 'uf',
    key: 'uf',
  },
  {
    title: 'Deliberação',
    dataIndex: 'deliberacao',
    key: 'deliberacao',
  },
  {
    title: 'Ato Societário',
    dataIndex: 'atoSocietario',
    key: 'atoSocietario',
  },
  {
    title: 'Quantidade de impressão',
    dataIndex: 'quantidadeImpressao',
    key: 'quantidadeImpressao',
  },
  {
    title: 'Complexidade do Processo',
    dataIndex: 'complexidadeProcesso',
    key: 'complexidadeProcesso',
  },
  {
    title: 'Setor',
    dataIndex: 'setor',
    key: 'setor',
  },
  {
    title: 'Executor',
    dataIndex: 'executor',
    key: 'executor',
  },
  {
    title: 'Serviço',
    dataIndex: 'servico',
    key: 'servico',
  },
  {
    title: 'SLA',
    dataIndex: 'sla',
    key: 'sla',
  },
  {
    title: 'Cumprimento de SLA',
    dataIndex: 'cumprimentoSla',
    key: 'cumprimentoSla',
  },
  {
    title: 'Data do Protocolo',
    dataIndex: 'dataProtocolo',
    key: 'dataProtocolo',
  },
  {
    title: 'Protocolo',
    dataIndex: 'protocolo',
    key: 'protocolo',
  },
  {
    title: 'Registro',
    dataIndex: 'registro',
    key: 'registro',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'MÊS',
    dataIndex: 'mes',
    key: 'mes',
  },
  {
    title: 'Período Processual',
    dataIndex: 'periodoProcessual',
    key: 'periodoProcessual',
  },
  {
    title: 'Data de Finalização',
    dataIndex: 'dataFinalizacao',
    key: 'dataFinalizacao',
  },
  {
    title: 'STATUS',
    dataIndex: 'STATUS',
    key: 'STATUS',
  },
  {
    title: 'NF',
    dataIndex: 'nf',
    key: 'nf',
  },
  // ...definir outras colunas conforme necessário
];

  // Handler para mudança no filtro
  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
  };

  const getRowClassName = (record) => {
    return record.status === 'CONCLUIDO' ? 'row-concluido' : 'row-outro-status';
  };

  return (
    <div className="acompanhamentoServico"> {/* Classe aplicada ao div container */}
      <h1>Acompanhamento de Serviço</h1>
      <Link to="/" className="voltarLink">Voltar à tela inicial</Link> {/* Classe aplicada ao Link */}
      <Input
        placeholder="Filtrar por qualquer entrada"
        value={filtro}
        onChange={handleFilterChange}
      />
      <Table
        dataSource={dados}
        columns={columns}
        loading={loading}
        rowClassName={getRowClassName}
      />
    </div>
  );  
};

export default AcompanhamentoServico;
