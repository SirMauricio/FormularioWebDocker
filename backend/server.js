require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const formularioRoutes = require('./routes/formularioRoutes'); 
const Admin = require('./routes/usersRouters');
const login = require('./routes/loginRouters'); 
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/formulario', formularioRoutes);
app.use("/login", login);
app.use("/users", Admin); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
