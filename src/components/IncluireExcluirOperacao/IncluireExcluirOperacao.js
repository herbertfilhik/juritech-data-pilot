// IncluireExcluirOperacao.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './IncluireExcluirOperacao.css';
import moment from 'moment'; // Importe moment se estiver usando DatePicker do antd
import { Form, Table, Input, Modal, Button, InputNumber, DatePicker } from 'antd';
import { message } from 'antd';


const IncluireExcluirOperacao = () => {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [registroAtual, setRegistroAtual] = useState(null);

  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const environment = process.env.REACT_APP_ENVIRONMENT;
  const baseURL = environment === "DEV" ? process.env.REACT_APP_DEV : process.env.REACT_APP_PRD;  

  const generateRandomTargetControl = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `2.023.${randomNumber.toString().padStart(3, '0')}`;
  };

  // Função para mostrar o modal em branco para um novo registro
  const handleNewRegister = () => {
    const newRecord = {
      // ... outros campos necessários inicializados
      controleTarget: generateRandomTargetControl(),
      // ... outros campos que você queira inicializar
    };

    setIsCreatingNew(true); // Estamos criando um novo registro    
    setRegistroAtual(newRecord); // Atualiza o registroAtual com o novo objeto
    setIsModalVisible(true); // Mostra o modal    
  };

  const handleCreate = async () => {
    try {
      // Assegure-se que registroAtual contém todos os dados do formulário
      console.log("Tentando criar um novo registro:", registroAtual);
  
      // Você precisa garantir que a estrutura de registroAtual corresponde àquela esperada pelo backend.
      const payload = {
        // estruture aqui os dados conforme esperado pelo seu modelo de Documento no backend
        // Por exemplo:
        nome: registroAtual.nome,
        dados: {
          "Controle Target": registroAtual.controleTarget,
          //"Data de Solicitação": registroAtual.dtSolicitacao ? registroAtual.dtSolicitacao.format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
          "Data de Solicitação": registroAtual.dataSolicitacao ? registroAtual.dataSolicitacao.toISOString() : null,
          //"Data de Início": registroAtual.dtInicio ? registroAtual.dtInicio.format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
          "Data de Início": registroAtual.dataInicio ? registroAtual.dataInicio.toISOString() : null,
          "Solicitante": registroAtual.solicitante,
          "Grupo": registroAtual.grupo,
          "Cliente": registroAtual.cliente,
          "CNPJ": registroAtual.cnpj,
          "Município": registroAtual.municipio,
          "UF": registroAtual.uf,
          "Deliberação": registroAtual.deliberacao,
          "Ato Societário": registroAtual.atoSocietario,
          "Quantidade de impressão": registroAtual.quantidadeImpressao,
          "Complexidade do Processo": registroAtual.complexidadeProcesso,
          "Setor": registroAtual.setor,
          "Executor": registroAtual.executor,
          "Serviço": registroAtual.servico,
          "SLA": registroAtual.sla,
          "Cumprimento de SLA": registroAtual.cumprimentoSLA,
          //"Data do Protocolo": registroAtual.dataProtocolo ? registroAtual.dataProtocolo.format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
          "Data do Protocolo": registroAtual.dataProtocolo ? registroAtual.dataProtocolo.toISOString() : null,
          "Protocolo": registroAtual.protocolo,
          "Registro": registroAtual.registro,
          "Status": registroAtual.status,
          "MÊS": registroAtual.mes,
          "Período Processual": registroAtual.periodoProcessual,
          //"Data de Finalização": registroAtual.dataFinalizacao ? registroAtual.dataFinalizacao.format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
          "Data de Finalização": registroAtual.dataFinalizacao ? registroAtual.dataFinalizacao.toISOString() : null,
          "STATUS": registroAtual.statusFaturamento,
          "NF": registroAtual.nf
        },
        // ... mais campos se necessário
      };
  
      // Faz a requisição POST para o servidor
      const response = await axios.post(`${baseURL}/api/createDocument`, payload);
  
      if (response.status === 201) {
        // Se a criação foi bem-sucedida, adicione o novo registro à lista de registros   
        message.success('Registro criado com sucesso!');

        // Atualizar a lista de registros no estado 'dados'     
        //setDados([...dados, response.data]);
        setDados(prevDados => [...prevDados, response.data]);

        // Fechar o modal
        setIsModalVisible(false);

        // Limpar o estado do registro atual para que o modal esteja limpo da próxima vez que for aberto
        setRegistroAtual(null);        

        // Realizar recarregamento da página para atualizar a tabela
        // window.location.reload();

      } else {
        message.error('Não foi possível criar o registro.');
      }
    } catch (error) {
      console.error('Erro ao criar o registro:', error);
      message.error(`Erro ao criar o registro: ${error.message}`);
    }
  };

  // Função chamada quando o usuário clica no botão Salvar na modal
  const handleSave = async () => {
    console.log("Tentando salvar o registro com a chave:", registroAtual?.key);  

    if (!registroAtual || !registroAtual.key) {
      message.error("Erro: chave do registro não definida.");
      return; // Não continue se 'key' não estiver definida
    }

    try {
      // Transforme o objeto do estado para o formato esperado pelo back-end
      const payload = {
        nome: registroAtual.nome, // assumindo que este campo exista no seu estado
        dados: {
          "Controle Target": registroAtual.controleTarget,
          //"Data de Solicitação": registroAtual.dtSolicitacao ? { "$date": registroAtual.dtSolicitacao } : null,
          "Data de Solicitação": registroAtual.dataSolicitacao ? registroAtual.dataSolicitacao.toISOString() : null,
          //"Data de Início": registroAtual.dtInicio ? { "$date": registroAtual.dtInicio } : null,
          "Data de Início": registroAtual.dataInicio ? registroAtual.dataInicio.toISOString() : null,
          "Solicitante": registroAtual.solicitante,
          "Grupo": registroAtual.grupo,
          "Cliente": registroAtual.cliente,
          "CNPJ": registroAtual.cnpj,
          "Município": registroAtual.municipio,
          "UF": registroAtual.uf,
          "Deliberação": registroAtual.deliberacao,
          "Ato Societário": registroAtual.atoSocietario,
          "Quantidade de impressão": registroAtual.quantidadeImpressao,
          "Complexidade do Processo": registroAtual.complexidadeProcesso,
          "Setor": registroAtual.setor,
          "Executor": registroAtual.executor,
          "Serviço": registroAtual.servico,
          "SLA": registroAtual.sla,
          "Cumprimento de SLA": registroAtual.cumprimentoSLA,
          //"Data do Protocolo": registroAtual.dataProtocolo ? { "$date": registroAtual.dataProtocolo } : null,
          "Data do Protocolo": registroAtual.dataProtocolo ? registroAtual.dataProtocolo.toISOString() : null,
          "Protocolo": registroAtual.protocolo,
          "Registro": registroAtual.registro,
          "Status": registroAtual.status,
          "MÊS": registroAtual.mes,
          "Período Processual": registroAtual.periodoProcessual,
          //"Data de Finalização": registroAtual.dataFinalizacao ? { "$date": registroAtual.dataFinalizacao } : null,
          "Data de Finalização": registroAtual.dataFinalizacao ? registroAtual.dataFinalizacao.toISOString() : null,
          "STATUS": registroAtual.statusFaturamento,
          "NF": registroAtual.nf
        },
        // ... inclua todas as outras propriedades de nível superior necessárias
      };

      // Aqui, substitua `baseURL` pelo seu URL de base real e `path` pelo caminho correto da API
      const response = await axios.put(`${baseURL}/api/saveRegister/${registroAtual.key}`, payload);

      if (response.status === 200) {
        // Atualize o estado se a resposta for bem-sucedida
        const updatedRecords = dados.map(item =>
          item.key === registroAtual.key ? { ...item, ...registroAtual } : item
        );
        setDados(updatedRecords);
        message.success('Registro atualizado com sucesso!');
      } else {
        message.error('Não foi possível atualizar o registro.');
      }

      // Feche a modal após a atualização
      setIsModalVisible(false);
    } catch (error) {
      // Log de erro e exibição de mensagem de erro para o usuário
      console.error('Erro ao salvar:', error);
      message.error(`Erro ao salvar o registro: ${error.message}`);
    }
  };

  // Função chamada quando o usuário clica no botão Excluir na modal
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/api/delete/${id}`);
  
      if (response.status === 200) {
        // Atualize o estado para refletir a exclusão do registro
        setDados(dados.filter(item => item.key !== id));
        message.success('Registro excluído com sucesso!');
      } else {
        message.error('Não foi possível excluir o registro.');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
      message.error(`Erro ao excluir o registro: ${error.message}`);
    }
  };
  
  const showModal = (registro) => {
    setIsCreatingNew(false); // Não estamos criando um novo registro, mas editando
    console.log("Chave do registro selecionado para edição:", registro.key);
    // Verifique se 'registro' possui uma chave 'key'
    if (!registro || !registro.key) {
      message.error("Erro: chave do registro para edição não definida.");
      return; // Não continue se 'key' não estiver definida
    }

    // Ajuste esta parte se você estiver utilizando dayjs ou moment para as datas
    const dataInicio = registro.dataInicio ? moment(registro.dataInicio) : null;
    const dataFinalizacao = registro.dataFinalizacao ? moment(registro.dataFinalizacao) : null;
    const dataProtocolo = registro.dataProtocolo ? moment(registro.dataProtocolo) : null;
    const dataSolicitacao = registro.dataSolicitacao ? moment(registro.dataSolicitacao) : null;
  
    setRegistroAtual({
      ...registro,
      dataInicio: dataInicio,
      dataFinalizacao: dataFinalizacao,
      dataProtocolo: dataProtocolo,
      dataSolicitacao: dataSolicitacao,
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
    setIsCreatingNew(false); // Reseta o estado para não estar criando um novo registro
    setRegistroAtual(null); // Limpa qualquer registro selecionado

  };

  // Renderize os botões do rodapé do modal com base em isCreatingNew
  const renderModalFooter = () => {
    if (isCreatingNew) {
      return [
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreate}>
          Criar
        </Button>
      ];
    } else {
      return [
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="delete" onClick={() => handleDelete(registroAtual.key)}>
          Excluir
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Salvar
        </Button>
      ];
    }
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
        dataSolicitacao: item.dados['Data de Solicitação'],
        dataInicio: item.dados['Data de Início'], // Added field
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
      dataIndex: 'dataSolicitacao',
      key: 'dataSolicitacao',
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
      dataIndex: 'cumprimentoSLA',
      key: 'cumprimentoSLA',
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
      dataIndex: 'statusFaturamento',
      key: 'statusFaturamento',
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
      <Button key="newRegister" type="primary" onClick={handleNewRegister}> Criar Registro </Button>
      <br />
      <Input
        placeholder="Filtrar por qualquer entrada"
        value={filtro}
        onChange={handleFilterChange}
      />
      <br />
      <Table
        dataSource={dados}
        columns={columns}
        loading={loading}
        rowClassName={getRowClassName}
      />
      <Modal
        key={registroAtual ? registroAtual.key : 'new'}
        title={isCreatingNew ? "Criar Novo Registro" : "Editar Registro"}
        visible={isModalVisible}
        onOk={isCreatingNew ? handleCreate : handleSave}
        onCancel={handleCancel}
        footer={renderModalFooter()}> {/*// Aqui usamos a função para determinar o rodapé*/}          
        {/* Formulário e/ou informações do registro para edição ou exclusão */}
        {/* Você pode usar registroAtual para acessar os dados do registro selecionado */}
        <Form
            layout="vertical"
            initialValues={{ ...registroAtual }} // Assegure-se de que registroAtual contém todos os dados do registro
            onValuesChange={(_, allValues) => {
              {/*setRegistroAtual(prev => ({ ...prev, ...allValues }));*/}
              setRegistroAtual(prev => {
                const newState = { ...prev, ...allValues };
                console.log('Novo estado de registroAtual:', newState); // Debug
                return newState;
              });
            }}
          >
          <Form.Item label="Solicitante" name="solicitante">
            <Input />
          </Form.Item>
          <Form.Item label="Data de Solicitação" name="dataSolicitacao">
            <DatePicker />
          </Form.Item>          
          <Form.Item label="Cliente" name="cliente">
            <Input />
          </Form.Item>
          <Form.Item label="CNPJ" name="cnpj">
            <Input />
          </Form.Item>
          <Form.Item label="Data de Início" name="dataInicio">
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
