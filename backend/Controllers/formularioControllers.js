const db = require("../database");

exports.crearFormulario = (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, celContacto, correo, mensaje } = req.body;

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
