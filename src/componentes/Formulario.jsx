import { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./Formulario.css"; // Importa el CSS

const Formulario = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    celContacto: "",
    correo: "",
    mensaje: "",
  });

  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info"); // success | error | info
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeRespuesta("");

    if (!captchaToken) {
      setTipoMensaje("error");
      setMensajeRespuesta("Por favor verifica que no eres un robot.");
      return;
    }

    try {
      const res = await axios.post(`/formulario`, {
        ...formulario,
        captchaToken,
      });

      setTipoMensaje("success");
      setMensajeRespuesta(res.data);

      setFormulario({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        celContacto: "",
        correo: "",
        mensaje: "",
      });
      setCaptchaToken(null);
    } catch (error) {
      console.error(error);
      setTipoMensaje("error");
      setMensajeRespuesta(
        error.response?.data?.message || "Error al enviar el formulario"
      );
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Formulario de Contacto</h2>

      {mensajeRespuesta && (
        <div className={`mensaje ${tipoMensaje}`}>
          {mensajeRespuesta}
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Apellido Paterno</label>
          <input
            type="text"
            name="apellidoPaterno"
            value={formulario.apellidoPaterno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Apellido Materno</label>
          <input
            type="text"
            name="apellidoMaterno"
            value={formulario.apellidoMaterno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Celular de Contacto</label>
          <input
            type="tel"
            name="celContacto"
            value={formulario.celContacto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Mensaje</label>
          <textarea
            name="mensaje"
            value={formulario.mensaje}
            onChange={handleChange}
            required
          />
        </div>

        <div className="captcha-container">
          <ReCAPTCHA
            sitekey="6Lcln2wrAAAAAEjW4SLk8aKJ8ZaTjYYwbH4vAP5k"
            onChange={handleCaptchaChange}
          />
        </div>

        <button type="submit" className="btn-enviar">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
