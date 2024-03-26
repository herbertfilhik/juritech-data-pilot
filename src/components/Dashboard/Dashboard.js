import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Dashboard = () => {
    const environment = process.env.REACT_APP_ENVIRONMENT;
    const baseURL = environment === "DEV" ? process.env.REACT_APP_DEV : process.env.REACT_APP_PRD;

    const [data, setData] = useState([]);

    // Simulação de busca de dados
    useEffect(() => {
        // Substitua o URL pelo endpoint específico do seu backend
        fetch(`${baseURL}/api/data`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Dashboard da Operação</h2>
            <div className="dashboard-content">
                <p>Quantidade de registros: {data.length}</p>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nomeDoSeuCampoX" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="nomeDoSeuCampoY" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
            <div className="dashboard-navigation">
                <Link to="/" className="btn btn-primary">Voltar para o início</Link>
            </div>
        </div>
    );
}

export default Dashboard;
