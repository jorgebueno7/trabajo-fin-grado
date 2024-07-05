const express = require('express');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(PORT, (error) => {
    if(!error)
        console.log(`Server is running on port ${PORT}`);
    else
        console.log(`Server is not running on port ${PORT}`);   
});