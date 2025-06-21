import { useState } from 'react';
import axios from 'axios';

const Formulario = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    celContacto: '',
    correo: '',
    mensaje: ''
  });

  const [mensajeRespuesta, setMensajeRespuesta] = useState('');

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeRespuesta('');

    try {
      const res = await axios.post('http://localhost:5000/formulario', formulario);
      setMensajeRespuesta(res.data);
      setFormulario({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        celContacto: '',
        correo: '',
        mensaje: ''
      });
    } catch (error) {
      console.error(error);
      setMensajeRespuesta('Error al enviar el formulario');
    }
  };

  return (
    <div className="formulario">
      <h2>Formulario de Contacto</h2>
      {mensajeRespuesta && <p>{mensajeRespuesta}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Apellido Paterno:</label>
          <input type="text" name="apellidoPaterno" value={formulario.apellidoPaterno} onChange={handleChange} required />
        </div>
        <div>
          <label>Apellido Materno:</label>
          <input type="text" name="apellidoMaterno" value={formulario.apellidoMaterno} onChange={handleChange} required />
        </div>
        <div>
          <label>Celular de Contacto:</label>
          <input type="tel" name="celContacto" value={formulario.celContacto} onChange={handleChange} required />
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" name="correo" value={formulario.correo} onChange={handleChange} required />
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea name="mensaje" value={formulario.mensaje} onChange={handleChange} required />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
