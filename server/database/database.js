const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to database:', error);
    } else {
        console.log('Connected to database successfully');
    }
});

module.exports = connection;
