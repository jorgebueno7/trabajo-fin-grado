const session = require('express-session');
const express = require('express');
const app = express();

const sessions = app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,   // Cambia esta clave secreta por algo más seguro
    resave: false,             // No guardar la sesión si no se modifica
    saveUninitialized: false,  // No guardar sesiones vacías
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // Expiración de la cookie de sesión (1 día en milisegundos)
        secure: false,               // Asegúrate de configurarlo en true si usas HTTPS
        httpOnly: true,              // Cookie no accesible desde el cliente
    },
}));

module.exports = sessions;