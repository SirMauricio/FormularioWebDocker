require('dotenv').config();
const express = require('express');
const cors = require('cors');

const formularioRoutes = require('./routes/formularioRoutes');
const Admin = require('./routes/usersRouters');
const login = require('./routes/loginRouters');
const app = express();

// Configurar CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://backend:5000',
  'https://suarez.efdiaz.xyz'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permite Postman, curl, etc.

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

// ✅ Aplicar CORS
app.use(cors(corsOptions));

// Parse JSON
app.use(express.json());

// Montar rutas
app.use('/api/formulario', formularioRoutes);
app.use('/api/login', login);
app.use('/api/users', Admin);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
