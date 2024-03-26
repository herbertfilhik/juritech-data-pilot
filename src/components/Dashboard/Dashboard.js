import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const environment = process.env.REACT_APP_ENVIRONMENT;
    const baseURL = environment === "DEV" ? process.env.REACT_APP_DEV : process.env.REACT_APP_PRD;

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${baseURL}/api/data`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede, resposta não ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, [baseURL]);

    return (
        <div className="dashboard-container">
            <h2>Dashboard da Operação</h2>
            <div className="dashboard-content">
                {/* Exibir total de registros */}
                <p>Quantidade de registros: {data.length}</p>
                {/* Gráfico de barras */}
                <BarChart width={600} height={300} data={[{nomeDoSeuCampoX: 'Total de Registros', nomeDoSeuCampoY: 4951}, {nomeDoSeuCampoX: 'Total de Concluídos', nomeDoSeuCampoY: 1000}]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nomeDoSeuCampoX" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="nomeDoSeuCampoY" fill="#8884d8" />
                </BarChart>
            </div>
            <div className="dashboard-navigation">
                <Link to="/" className="btn btn-primary">Voltar para o início</Link>
            </div>
        </div>
    );
}

export default Dashboard;
