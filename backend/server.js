require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); // opcional si usas express.json()

const formularioRoutes = require('./routes/formularioRoutes'); 
const Admin = require('./routes/usersRouters');
const login = require('./routes/loginRouters'); 

const app = express();

// // Middleware para logging
// app.use((req, res, next) => {
//   console.log(`Request recibida: ${req.method} ${req.url}`);
//   next();
// });

// CORS configurado para local y dominio en producción
const corsOptions = {
origin: ['http://localhost:5173', 'https://ramita.shop'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// Parse JSON (puedes usar express.json() en vez de bodyParser)
app.use(express.json());

// Rutas
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
