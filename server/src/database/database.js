// const mysql = require('mysql2');
// require('dotenv').config();

// const connectWithRetry = () => {
//   const connection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
//   });

//   connection.connect((error) => {
//     if (error) {
//       console.error('Error connecting to database:', error);
//       console.log('Retrying connection in 5 seconds...');
//       setTimeout(connectWithRetry, 5000); // Reintentar después de 5 segundos
//     } else {
//       console.log('Connected to database successfully');
//       // Puedes exportar la conexión o realizar cualquier otra operación necesaria aquí
//       module.exports = connection;
//     }
//   });
// };

// connectWithRetry();

const { Sequelize }= require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('sportly', 'jorgebueno', 'jorgebueno_7A', {
    host: "db",
    dialect: "mysql",
});

module.exports = sequelize