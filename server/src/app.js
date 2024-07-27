const express = require('express');
const cors = require('cors');
const db = require('./database/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT_SERVER || 5000 ;

app.use(cors());
app.use(express.json());

app.use('/sportly', require('./routes/users'));
app.use('/sportly', require('./routes/sports'));

app.listen(PORT, (error) => {
    if(!error)
        console.log(`Server is running on port ${PORT}`);
    else
        console.log(`Server is not running on port ${PORT}`);   
});