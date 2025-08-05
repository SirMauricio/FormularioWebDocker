import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom'; 
import "./login.css";
import logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => document.body.classList.remove('login-page');
  }, []);

  const iniciarSesion = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          correo: email.trim(),
          contrasena: password,
        }
      );

      if (response.data.status) {
        const id = response.data.respuesta.id_usuario;
        const rol = response.data.respuesta.rol;

        login({ id_usuario: id, rol });

        if (rol === 1) {
          navigate(`/users/${id}`);
        } else {
          navigate('/formulario');
        }
      } else {
        alert("Correo o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Completa todos los campos.");
    iniciarSesion();
  };

  return (
    <div className="App">
      <div className="login-box mt-8 mb-8">
        <img className="logito" src={logo} alt="Formulario Web Logo" />
        <h1 className="project-title">Formulario WEB</h1>
        <h2>Inicio de Sesión</h2>
        <p className="font-bold text-sm text-gray-500">Accede con tus credenciales</p>

        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Correo Electrónico</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Contraseña</label>
          </div>

          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

