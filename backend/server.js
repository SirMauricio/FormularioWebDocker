require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const formularioRoutes = require('./routes/formularioRoutes');  // importa las rutas
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/formulario', formularioRoutes);  // usa las rutas modularizadas

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
