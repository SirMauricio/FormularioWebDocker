require('dotenv').config();
const express = require('express');
const cors = require('cors');

const formularioRoutes = require('./routes/formularioRoutes');
const Admin = require('./routes/usersRouters');
const login = require('./routes/loginRouters');

const app = express();

// Configurar CORS
const corsOptions = {
  origin: 'https://ramita.shop',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

// Parse JSON
app.use(express.json());

// Montar rutas
app.use('/formulario', formularioRoutes);
app.use('/login', login);
app.use('/users', Admin);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// Montar rutas con manejo de errores para detectar problemas
try {
  app.use('/formulario', formularioRoutes);
  console.log('Ruta /formulario montada correctamente');
} catch (err) {
  console.error('Error montando /formulario:', err);
}

try {
  app.use('/login', login);
  console.log('Ruta /login montada correctamente');
} catch (err) {
  console.error('Error montando /login:', err);
}

try {
  app.use('/users', Admin);
  console.log('Ruta /users montada correctamente');
} catch (err) {
  console.error('Error montando /users:', err);
}

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

