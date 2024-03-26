import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
    const environment = process.env.REACT_APP_ENVIRONMENT;
    const baseURL = environment === "DEV" ? process.env.REACT_APP_DEV : process.env.REACT_APP_PRD;

    const [data, setData] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [totalConcluidos, setTotalConcluidos] = useState(0);

    useEffect(() => {
        fetch(`${baseURL}/api/data`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede, resposta não ok');
                }
                return response.json();
            })
            .then(dados => {
                setData(dados);
                // Aqui você ajustaria conforme os seus dados reais
                setTotalRegistros(dados.length);
                // Supondo que 'concluido' seja um campo booleano em seus dados
                setTotalConcluidos(dados.filter(item => item.dados.Status === "CONCLUIDO").length);                
            })
            .catch(error => console.log(error));
    }, [baseURL]);

    // Preparando dados para o gráfico
    const dadosGrafico = [
        { TotaisRegistros: 'Total de Registros', TotalRegistros: totalRegistros, cor: '#0088FE' },
        { TotaisConcluidos: 'Total de Concluídos', TotalConcluidos: totalConcluidos, cor: '#00C49F' },
    ];    

    const dadosGraficoPizza = [
        { name: 'Registros', value: totalRegistros },
        { name: 'Concluídos', value: totalConcluidos },
    ];

    const coresPizza = ['#0088FE', '#00C49F'];

    return (
        <div className="dashboard-container">
          <h2>Dashboard da Operação</h2>
          <div className="dashboard-content">
            
            <p>Quantidade de registros: {totalRegistros}</p>
            <p>Quantidade de registros concluídos: {totalConcluidos}</p>
            
            <BarChart width={600} height={300} data={dadosGrafico}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis />
              <YAxis />
              <Tooltip />
              <Legend width={400} wrapperStyle={{ top: 250, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
              <Bar dataKey="TotalRegistros" fill="#0088FE" barSize={200} />
              <Bar dataKey="TotalConcluidos" fill="#00C49F" barSize={200} />
            </BarChart>
        </div>

        <div className="pie-chart-section">
            <h2></h2>
                <PieChart width={800} height={600}>
                    <Pie
                        data={dadosGraficoPizza}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                    >
                        {dadosGraficoPizza.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={coresPizza[index % coresPizza.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
        </div>

          <div className="dashboard-navigation">
            <Link to="/" className="btn btn-primary">Voltar para o início</Link>
          </div>
        </div>
    );
}

export default Dashboard;
