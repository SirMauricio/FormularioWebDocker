const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const formularioController = require("./Controllers/formularioControllers");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/formulario", formularioController.crearFormulario);
app.get("/formulario", formularioController.obtenerFormularios);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
