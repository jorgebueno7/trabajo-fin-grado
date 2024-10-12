const users = require('../models/User');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const transporter = require('../utils/mailtrap')
const sessions = require('../utils/sessions');

// require('dotenv').config();

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
    // try {
    //     const { dni, nombre, apellidos, email, password, isAdminUser = false } = req.body;
    //     const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    //     if (!passwordRegex.test(password)) {
    //         return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula y un número.' });
    //     }

    //     if (isAdminUser) {
    //         const admin = await users.findOne({ where: { isAdminUser: true } });
    //         if (admin) {
    //             return res.status(401).json({ error: 'Already have a user admin' });
    //         }
    //     } 
            
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const usuario = await users.create({ dni, nombre, apellidos, email, password: hashedPassword, isAdminUser: isAdmin });
    //     if(dni && nombre && apellidos && email && password && isAdminUser){
    //         res.status(201).json(usuario)
    //         const email_options = {
    //             from: 'sportly@events.com',
    //             to: email,
    //             subject: 'Gracias por registrarte en Sportly Events!',
    //             html: `
    //                 <h1>Hola ${nombre} 🙌</h1>
    //                 <p>Gracias por registrarte en Sportly Events! 🚴 ⚽ </p>
    //                 <p>Estamos felices de contar con tu presencia 
    //                     y de que puedas comenzar una nueva etapa en el mundo de los eventos deportivos!</p>
    //                 <br />
    //                 <p>Por favor, haga click en el siguiente enlace para confirmar su dirección de correo electrónico: 
    //                 <a href="http://localhost:5173/login">Confirmar Email</a></p>`
    //         };
    //         transporter.sendMail(email_options, (error, info) => {
    //             if (error) { return console.log(error); }
    //                 console.log('Email sent: ' + info.response);
    //         });
    //     } else {
    //         res.status(400).json({error: 'ERROR_CREATE_USERS'})
    //     }     
    // } catch (error) {
    //     res.status(500).json({error: `ERROR_CREATE_USERS: ${error}`})
    // }
    const { dni, nombre, apellidos, email, password, isAdminUser = false } = req.body;

    // Validar que los campos requeridos no estén vacíos
    if (!dni || !nombre || !apellidos || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula y un número.' });
    }
    try {
        if(isAdminUser){
            const admin = await users.findOne({ where: { isAdminUser: true } });
            if (admin) {
                return res.status(401).json({ error: 'Ya existe un usuario administrador.' });
            }
        }
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crear el nuevo usuario
        const newUser = await users.create({ dni, nombre, apellidos, email, password: hashedPassword, isAdminUser });
        // Responder con el nuevo usuario creado, omitiendo la contraseña por razones de seguridad
        res.status(201).json({ id: newUser.id, dni: newUser.dni, email: newUser.email, nombre: newUser.nombre, apellidos: newUser.apellidos });
        const email_options = {
            from: 'sportly@events.com',
            to: email,
            subject: 'Gracias por registrarte en Sportly Events!',
            html: `
                <h1>Hola ${nombre} 🙌</h1>
                <p>Gracias por registrarte en Sportly Events! 🚴 ⚽ </p>
                <p>Estamos felices de contar con tu presencia 
                    y de que puedas comenzar una nueva etapa en el mundo de los eventos deportivos!</p>
                <br />
                <p>Por favor, haga click en el siguiente enlace para confirmar su dirección de correo electrónico: 
                <a href="http://localhost:5173/login">Confirmar Email</a></p>`
        };
        transporter.sendMail(email_options, (error, info) => {
            if (error) { return console.log(error); }
                console.log('Email sent: ' + info.response);
        });
    } catch (error) {
        console.error(error);
        // Manejar errores (por ejemplo, si el DNI o email ya existen)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El DNI o email ya están en uso' });
        }
        res.status(500).json({ error: `ERROR_CREATE_USERS: ${error}` });
    }
}

const completeProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca, profile_complete } = req.body;
        await users.update({ fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca, profile_complete }, { where: { id } });
        res.status(200).json({message: 'Profile completed successfully'})
    } catch (error) {
        res.status(500).json({error: `ERROR_COMPLETE_PROFILE: ${error}`})
    }
}

const loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await users.findOne({ where: { email } });
        console.log("REQ:" + req.body);
        // const token = jwt.sign({ id: usuario.id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        if(usuario && (await bcrypt.compare(password, usuario.password))){
            console.log("Contraseña correcta");
            req.session.userId = usuario.id;
            // req.session.role = usuario.role;
            // res.status(200).json({usuario, token})
            res.status(200).json(usuario);
            // const email_options = {
            //     from: 'sportly@events.com',
            //     to: email,
            //     subject: 'Te damos la bienvenida a Sportly App',
            //     html: '<b>Inicio de sesión realizado con éxito!</b>'
            // };
            // transporter.sendMail(email_options, (error, info) => {
            //     if (error) { return console.log(error); }
            //     console.log('Email sent: ' + info.response);
            // });
        }else{
            res.status(401).json({error: 'ERROR_LOGIN_USERS'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_LOGIN_USERS: ${error}`})
    }
}

const logout = async (req, res) => {
    try {
        res.status(200).json({message: 'Logout successfully'})
    } catch (error) {
        res.status(500).json({error: `ERROR_LOGOUT: ${error}`})
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
module.exports = { getAllUsers, registroUsers, loginUsers, logout, getUserById, updateUserById, deleteUserById, completeProfile};