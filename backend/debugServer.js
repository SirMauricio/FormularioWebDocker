const express = require('express');
const app = express();

const formularioRoutes = require('./routes/formularioRoutes');
const Admin = require('./routes/usersRouters');
const login = require('./routes/loginRouters');

app.use('/formulario', formularioRoutes);
app.use('/users', Admin);
app.use('/login', login);

app.listen(5000, () => {
console.log('Servidor mínimo en puerto 5000');
});
