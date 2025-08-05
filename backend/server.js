require('dotenv').config();
const express = require('express');
const cors = require('cors');

const formularioRoutes = require('./routes/formularioRoutes');
const Admin = require('./routes/usersRouters');
const login = require('./routes/loginRouters');
const app = express();

// Configurar CORS
const allowedOrigins = ['http://localhost:3000', 'http://backend:5000'];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // para peticiones sin origen (Postman, etc)

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};


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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

