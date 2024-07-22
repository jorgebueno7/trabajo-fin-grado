const users = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const usuarios = await users.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_ALL_USERS: ${error}`})
    }
}

const registroUsers = async (req, res) => {
    try {
        const { dni, nombre, apellidos, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuarios = await users.create({ dni, nombre, apellidos, email, password: hashedPassword })
        if(dni && nombre && apellidos && email && password){
            res.status(201).json(usuarios)
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_CREATE_USERS: ${error}`})
    }
}

module.exports = { getAllUsers, registroUsers };