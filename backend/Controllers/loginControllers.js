const { json } = require("express");
const connection = require("../database");
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); 

let codigo;


enviarMail = async(dirreccion, coding) => {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'mauricio.suv@gmail.com',
      pass: 'xmfp zmcj hbhl duyp',
    }
  }
  const mensaje = {
    from: 'mauricio.suv@gmail.com',
    to: `${dirreccion}`,
    subject: 'Validación de acceso a TerraVision',
    text: `Estimado usuario,
  
    Gracias por registrarse en CheemsFormulario. Para completar su inicio de sesión, por favor ingrese el siguiente código de validación en el campo correspondiente en la página de login:
  
    Código de validación: **${coding}**
  
    Este proceso es parte de las medidas de seguridad para proteger su cuenta. Si no ha solicitado este inicio de sesión, por favor ignore este mensaje.
  
    Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro soporte.
  
    Atentamente,  
    El equipo de TerraVision`
  }
  
  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje);
  console.log(info);
  console.log("---------------");
}


function generarCodigoAleatorio() {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  codigo = "";

  for (let i = 0; i < 6; i++) {
    const caracterAleatorio = caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
    codigo += caracterAleatorio;
  }

  return codigo;
}


function Login(request, response) {
  const email = request.body.correo || request.body.usuario;
  const password = request.body.contrasena || request.body.password;

  if (!email || !password) {
    return response.status(400).json({ error: "Faltan campos correo o contraseña" });
  }

  const emailTrimmed = email.trim();

  connection.query(
    `SELECT id_usuario, rol, contrasena_hash FROM usuarios WHERE correo = ?`,
    [emailTrimmed],
    async (error, result) => {
      if (error) {
        console.error("Error en la consulta:", error);
        return response.status(500).json({ error: "Error interno del servidor" });
      }

      if (result.length === 0) {
        return response.status(200).json({
          respuesta: "No se encontró un usuario con ese correo",
          status: false,
        });
      }

      const user = result[0];

      const passwordMatch = await bcrypt.compare(password, user.contrasena_hash);

      if (!passwordMatch) {
        return response.status(200).json({
          respuesta: "Contraseña incorrecta",
          status: false,
        });
      }

      const codigo = generarCodigoAleatorio();

      connection.query(
        "UPDATE usuarios SET codigo = ? WHERE id_usuario = ?;",
        [codigo, user.id_usuario],
        async (errors) => {
          if (errors) {
            console.error("Error al guardar el código:", errors);
            return response.status(500).json({ error: "Error al guardar el código de verificación" });
          }

          await enviarMail(emailTrimmed, codigo);

          response.status(200).json({
            respuesta: {
              id_usuario: user.id_usuario,
              rol: user.rol,
              correo: emailTrimmed
            },
            status: true,
          });
        }
      );
    }
  );
}

function confirmarLogin(request, response) {
  const { id, codigo } = request.body;
  console.log("----> id: " + id + " codigo: " + codigo)

  connection.query(
    'UPDATE usuarios SET acceso = 1 WHERE id_usuario = ? AND codigo = ?',
    [id, codigo],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el acceso del usuario: ", error);
        response.status(500).json({ error: "Error interno del servidor al confirmar el login", status: false });
      } else {
        if (results.affectedRows > 0) {
          console.log('Código del usuario es correcto');
          response.status(200).json({ status: true, acceso: true });
        } else {
          console.log('Código del usuario es incorrecto');
          response.status(200).json({ status: false });
        }
      }
    }
  );
}

module.exports = {
  Login,
  confirmarLogin,
};
