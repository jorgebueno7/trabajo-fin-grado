
const express = require('express');
const cors = require('cors');
const db = require('./database/database');
const session = require('express-session');
require('dotenv').config();
require('./models/associations');

const app = express();
const PORT = process.env.PORT_SERVER || 5000 ;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,   // Cambia esta clave secreta por algo más seguro
    resave: false,             // No guardar la sesión si no se modifica
    saveUninitialized: false,  // No guardar sesiones vacías
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // Expiración de la cookie de sesión (1 día en milisegundos)
        secure: false,               // Asegúrate de configurarlo en true si usas HTTPS
        httpOnly: true,              // Cookie no accesible desde el cliente
        sameSite: 'lax',
    }
}));

app.use('/sportly', require('./routes/users'));
app.use('/sportly', require('./routes/sports'));
app.use('/sportly', require('./routes/events'));
app.use('/sportly', require('./routes/user-events'));
app.use('/sportly', require('./routes/ratings'));
app.use('/sportly', require('./routes/rankings'));
app.use('/sportly', require('./routes/news'));

app.listen(PORT, (error) => {
    if(!error)
        console.log(`Server is running on port ${PORT}`);
    else
        console.log(`Server is not running on port ${PORT}`);   
});