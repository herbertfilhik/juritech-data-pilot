// IncluireExcluirOperacao.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './IncluireExcluirOperacao.css';
import moment from 'moment'; // Importe moment se estiver usando DatePicker do antd
import { Form, Table, Input, Modal, Button, InputNumber, DatePicker } from 'antd';


const IncluireExcluirOperacao = () => {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [registroAtual, setRegistroAtual] = useState(null);

  const environment = process.env.REACT_APP_ENVIRONMENT;
  const baseURL = environment === "DEV" ? process.env.REACT_APP_DEV : process.env.REACT_APP_PRD;  

  // Função chamada quando o usuário clica no botão Salvar na modal
  const handleSave = async () => {
    try {
      // Aqui você faria a chamada API para salvar as alterações
      // Por exemplo, se você está editando um registro, você pode fazer uma chamada PUT ou PATCH
      await axios.put(`/api/caminho/${registroAtual.key}`, {
        // ...dados para atualizar...
      });
      // Atualize o estado se necessário e feche a modal
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      // Trate o erro como achar melhor
    }
  };

  // Função chamada quando o usuário clica no botão Excluir na modal
  const handleDelete = async () => {
    try {
      // Aqui você faria a chamada API para excluir o registro
      await axios.delete(`/api/caminho/${registroAtual.key}`);
      // Atualize o estado se necessário e feche a modal
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erro ao excluir:', error);
      // Trate o erro como achar melhor
    }
  };
  
  const showModal = (registro) => {
    // Ajuste esta parte se você estiver utilizando dayjs ou moment para as datas
    const dataInicio = registro.dtInicio ? moment(registro.dtInicio) : null;
    const dataFinalizacao = registro.dataFinalizacao ? moment(registro.dataFinalizacao) : null;
    const dataProtocolo = registro.dataProtocolo ? moment(registro.dataProtocolo) : null;
  
    setRegistroAtual({
      ...registro,
      dtInicio: dataInicio,
      dataFinalizacao: dataFinalizacao,
      dataProtocolo: dataProtocolo,
      // Outros campos que requerem tratamento especial para datas ou outros tipos
    });
  
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Aqui você coloca a lógica para alterar ou excluir o registro
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Função para buscar dados filtrados
  const buscarDadosFiltrados = async (filtro) => {
    setLoading(true);
    try {
      //const response = await axios.get(`http://localhost:3001/api/incluireExcluirOperacao?filtro=${filtro}`);
      //const response = await axios.get(`https://juritech-data-pilot-backend-8fc90525fb93.herokuapp.com/api/incluireExcluirOperacao?filtro=${filtro}`);
      const response = await axios.get(`${baseURL}/api/incluireExcluirOperacao?filtro=${filtro}`);

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
      title: 'Ação',
      key: 'acao',
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Editar/Excluir
        </Button>
      ),
    },
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
    <div className="incluireExcluirOperacao"> {/* Classe aplicada ao div container */}
      <h1>Manutenção de Serviço</h1>
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
      <Modal
        key={registroAtual ? registroAtual.key : null}
        title="Editar Registro"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="delete" onClick={handleDelete}>
            Excluir
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Salvar
          </Button>,
        
          // Botões de ação, como salvar alterações ou excluir registro, devem ser adicionados aqui
        ]}>
        {/* Formulário e/ou informações do registro para edição ou exclusão */}
        {/* Você pode usar registroAtual para acessar os dados do registro selecionado */}
        <Form
            layout="vertical"
            initialValues={{ ...registroAtual }} // Assegure-se de que registroAtual contém todos os dados do registro
            onValuesChange={(changedValues, allValues) => {
              setRegistroAtual(allValues);
            }}
          >
          <Form.Item label="Solicitante" name="solicitante">
            <Input />
          </Form.Item>
          <Form.Item label="Cliente" name="cliente">
            <Input />
          </Form.Item>
          <Form.Item label="CNPJ" name="cnpj">
            <Input />
          </Form.Item>
          <Form.Item label="Data de Início" name="dtInicio">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Grupo" name="grupo">
            <Input />
          </Form.Item>
          <Form.Item label="Município" name="municipio">
            <Input />
          </Form.Item>
          <Form.Item label="UF" name="uf">
            <Input />
          </Form.Item>
          <Form.Item label="Deliberação" name="deliberacao">
            <Input />
          </Form.Item>
          <Form.Item label="Ato Societário" name="atoSocietario">
            <Input />
          </Form.Item>
          <Form.Item label="Quantidade de impressão" name="quantidadeImpressao">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Complexidade do Processo" name="complexidadeProcesso">
            <Input />
          </Form.Item>
          <Form.Item label="Setor" name="setor">
            <Input />
          </Form.Item>
          <Form.Item label="Executor" name="executor">
            <Input />
          </Form.Item>
          <Form.Item label="Serviço" name="servico">
            <Input />
          </Form.Item>
          <Form.Item label="SLA" name="sla">
            <Input />
          </Form.Item>
          <Form.Item label="Cumprimento de SLA" name="cumprimentoSLA">
            <Input />
          </Form.Item>
          <Form.Item label="Data do Protocolo" name="dataProtocolo">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Protocolo" name="protocolo">
            <Input />
          </Form.Item>
          <Form.Item label="Registro" name="registro">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
          <Form.Item label="MÊS" name="mes">
            <Input />
          </Form.Item>
          <Form.Item label="Período Processual" name="periodoProcessual">
            <Input />
          </Form.Item>
          <Form.Item label="Data de Finalização" name="dataFinalizacao">
            <DatePicker />
          </Form.Item>
          <Form.Item label="STATUS" name="statusFaturamento">
            <Input />
          </Form.Item>
          <Form.Item label="NF" name="nf">
            <Input />
          </Form.Item>
          {/* Adicione Form.Items para outros campos que você quer editar */}
          {/* ... */}
        </Form>
      </Modal>
    </div>
  );  
};

export default IncluireExcluirOperacao;
