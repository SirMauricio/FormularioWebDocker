const db = require("../database");
const fetch = require("node-fetch");

exports.crearFormulario = async (req, res) => {
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    celContacto,
    correo,
    mensaje,
    captchaToken
  } = req.body;

  // Verifica si viene el token
  if (!captchaToken) {
    return res.status(400).json({ message: "Captcha no enviado" });
  }

  try {
    // Valida el captcha con Google
const secretKey = process.env.RECAPTCHA_SECRET;
const captchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: `secret=${secretKey}&response=${captchaToken}`
});
const captchaData = await captchaResponse.json();

if (!captchaData.success) {
  return res.status(403).json({ message: "Captcha inválido. Inténtalo de nuevo." });
}

    // Si el captcha es válido, guardar en la BD
    const sql = `
      INSERT INTO formulario (nombre, apellidoPaterno, apellidoMaterno, celContacto, correo, mensaje)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [nombre, apellidoPaterno, apellidoMaterno, celContacto, correo, mensaje], (err, result) => {
      if (err) {
        console.error("Error al insertar datos:", err);
        return res.status(500).send("Error al guardar el formulario");
      }
      res.status(200).send("Formulario guardado correctamente");
    });

  } catch (error) {
    console.error("Error al validar captcha:", error);
    res.status(500).json({ message: "Error al verificar captcha" });
  }
};

exports.obtenerFormularios = (req, res) => {
  const sql = "SELECT * FROM formulario";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener formularios:", err);
      return res.status(500).send("Error al obtener datos");
    }
    res.json(results);
  });
};
