import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
const [formularios, setFormularios] = useState([]);
const [cargando, setCargando] = useState(true);

useEffect(() => {
    axios
        .get(`${import.meta.env.VITE_API_URL}/formulario`)
        .then((res) => {
        setFormularios(res.data);
        setCargando(false);
    })
        .catch((error) => {
        console.error('Error al cargar formularios:', error);
        setCargando(false);
    });
}, []);

return (
    <div className="dashboard-container">
    <h1 className="dashboard-title">Dashboard de Formularios</h1>

    {cargando ? (
        <p className="dashboard-loading">Cargando datos...</p>
    ) : (
        <>
        {formularios.length === 0 ? (
            <p className="dashboard-empty">No hay formularios registrados.</p>
        ) : (
            <table className="dashboard-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre completo</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Mensaje</th>
                </tr>
            </thead>
            <tbody>
                {formularios.map((item) => (
                    <tr key={item.id}>
                    <td>{item.forId}</td>
                    <td>{`${item.nombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`}</td>
                    <td>{item.celContacto}</td>
                    <td>{item.correo}</td>
                    <td>{item.mensaje}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        )}
        </>
    )}
    </div>
);
};

export default Dashboard;

