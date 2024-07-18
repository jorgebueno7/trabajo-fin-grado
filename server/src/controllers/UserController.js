const users = require('../models/User');

const getAllUsers = async (req, res) => {
    const usuarios = await users.findAll();
    res.status(200).json(usuarios);
}

const registroUsers = async (req, res) => {
    const { dni, nombre, apellidos, email, password } = req.body;
    const usuarios = await users.create({ dni, nombre, apellidos, email, password })
    if(dni && nombre && apellidos && email && password){
            res.status(201).json(usuarios)
    }
    else{
        res.json({error: `ERROR_CREATE_USERS: Faltan parámetros en el body`})
    }
}

module.exports = { getAllUsers, registroUsers};