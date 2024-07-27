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

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await users.findByPk(id);
        if(usuario){
            res.status(200).json(usuario)
        }else{
            res.status(404).json({error: 'User with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_USER_BY_ID: ${error}`})
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

const loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await users.findOne({ where: { email } });
        if(usuario && (await bcrypt.compare(password, usuario.password))){
            res.status(200).json(usuario)
        }else{
            res.status(401).json({error: 'ERROR_LOGIN_USERS'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_LOGIN_USERS: ${error}`})
    }
}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { dni, nombre, apellidos, email, password } = req.body;
        users.update({ dni, nombre, apellidos, email, password }, { where: { id } });
        res.status(200).json({message: 'User updated successfully'})
    } catch (error) {
        res.status(500).json({ error: `ERROR_UPDATE_USER: ${error}` });
    }
}
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        await users.destroy({ where: { id: id } });
        res.status(200).json({message: 'User deleted successfully'})
    } catch (error) {
        res.status(500).json({error: `ERROR_DELETE_USER: ${error}`})
    }
}
module.exports = { getAllUsers, registroUsers, loginUsers, getUserById, updateUserById, deleteUserById };