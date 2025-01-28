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

// const registroUsers = async (req, res) => {
//     const { dni, nombre, apellidos, email, password, isAdminUser = false, 
//         fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca } = req.body;
//     if (!dni || !nombre || !apellidos || !email || !password || !fecha_nacimiento || 
//         !telefono || !direccion || !altura || !peso || !deporte || !mejor_marca) {
//         return res.status(400).json({ message: 'Todos los campos son obligatorios' });
//     }
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
//     if (!passwordRegex.test(password)) {
//         return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula y un número.' });
//     }
//     try {
//         if(isAdminUser){
//             const admin = await users.findOne({ where: { isAdminUser: true } });
//             if (admin) {
//                 return res.status(401).json({ error: 'Ya existe un usuario administrador.' });
//             }
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const usuario = await users.create({ dni, nombre, apellidos, email, password: hashedPassword, isAdminUser,             
//             fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca, profile_complete: true
//         });

//         res.status(201).json({
//             user: {
//                 id: usuario.id,
//                 dni: usuario.dni,
//                 email: usuario.email,
//                 nombre: usuario.nombre,
//                 apellidos: usuario.apellidos,
//                 profile_complete: usuario.profile_complete,
//                 isAdminUser: usuario.isAdminUser,
//                 fecha_nacimiento: usuario.fecha_nacimiento,
//                 telefono: usuario.telefono,
//                 direccion: usuario.direccion,
//                 altura: usuario.altura,
//                 peso: usuario.peso,
//                 deporte: usuario.deporte,
//                 mejor_marca: usuario.mejor_marca
//             }
//         });
        
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
//     } catch (error) {
//         console.error(error);
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             return res.status(409).json({ message: 'El DNI o email ya están en uso' });
//         }
//         res.status(500).json({ error: `ERROR_CREATE_USERS: ${error}` });
//     }
// }

const registroUsers = async (req, res) => {
    const { dni, nombre, apellidos, email, password, isAdminUser = false, role = 'participante', 
        fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca } = req.body;
    if (!dni || !nombre || !apellidos || !email || !password || !fecha_nacimiento || 
        !telefono || !direccion || !altura || !peso || !deporte || !mejor_marca) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula y un número.' });
    }
    const allowedRoles = ['administrador', 'organizador', 'participante'];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ error: 'El rol especificado no es válido.' });
    }
    try {
        if(isAdminUser){
            const admin = await users.findOne({ where: { isAdminUser: true } });
            if (admin) {
                return res.status(401).json({ error: 'Ya existe un usuario administrador.' });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await users.create({ 
            dni, nombre, apellidos, email, password: hashedPassword, isAdminUser, role,
            fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca, profile_complete: true
        });

        res.status(201).json({
            user: {
                id: usuario.id,
                dni: usuario.dni,
                email: usuario.email,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                profile_complete: usuario.profile_complete,
                isAdminUser: usuario.isAdminUser,
                role: usuario.role,
                fecha_nacimiento: usuario.fecha_nacimiento,
                telefono: usuario.telefono,
                direccion: usuario.direccion,
                altura: usuario.altura,
                peso: usuario.peso,
                deporte: usuario.deporte,
                mejor_marca: usuario.mejor_marca
            }
        });

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
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El DNI o email ya están en uso' });
        }
        res.status(500).json({ error: `ERROR_CREATE_USERS: ${error}` });
    }
};


const userAdminExists = async (req, res) => {
    try {
        const admin = await users.findOne({ where: { isAdminUser: true } });
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({error: 'No admin user found'});
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_USER_ADMIN_EXISTS: ${error}`});
    }
}

// const completeProfile = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca, profile_complete } = req.body;
//         await users.update({ fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca, profile_complete }, { where: { id } });
//         res.status(200).json({message: 'Profile completed successfully'})
//     } catch (error) {
//         res.status(500).json({error: `ERROR_COMPLETE_PROFILE: ${error}`})
//     }
// }

const completeProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca } = req.body;

        // Verificar si alguno de los campos está vacío
        if (!fecha_nacimiento || !telefono || !direccion || !altura || !peso || !deporte || !mejor_marca) {
            return res.status(400).json({error: 'All fields must be completed'});
        }

        // Si todos los campos están completos, actualizar el perfil
        await users.update({ fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca, profile_complete: true }, { where: { id } });
        res.status(200).json({message: 'Profile completed successfully'})
    } catch (error) {
        res.status(500).json({error: `ERROR_COMPLETE_PROFILE: ${error}`})
    }
}

const loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await users.findOne({ where: { email } });
        console.log("Usuario encontrado:", usuario);
        if(usuario && (await bcrypt.compare(password, usuario.password))){
            console.log("Inicio de sesión exitoso para:", email);
            req.session.userId = usuario.id;
            res.status(200).json({
                user: {
                    id: usuario.id,
                    dni: usuario.dni,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    profile_complete: usuario.profile_complete,
                    isAdminUser: usuario.isAdminUser,
                    fecha_nacimiento: usuario.fecha_nacimiento,
                    telefono: usuario.telefono,
                    direccion: usuario.direccion,
                    altura: usuario.altura,
                    peso: usuario.peso,
                    deporte: usuario.deporte,
                    mejor_marca: usuario.mejor_marca
                },
            });
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

// const updateUserProfile = async (req, res) => {
//     console.log('Datos de la sesión:', req.session);
//     try {
//         const { userId } = req.session;
//         const { nombre, apellidos, email, telefono, direccion, altura, peso, deporte, mejor_marca } = req.body;

//         if (!userId) {
//             return res.status(401).json({ error: 'No autorizado' });
//         }
//         const [updatedRows] = await users.update(
//             { nombre, apellidos, email, telefono, direccion, altura, peso, deporte, mejor_marca },
//             { where: { id: userId }}, { withCredentials: true }
//         );
//         if (updatedRows === 0) {
//             return res.status(404).json({ error: 'Usuario no encontrado o no se pudo actualizar' });
//         }
//         res.status(200).json({ message: 'Perfil actualizado exitosamente' });
//     } catch (error) {
//         res.status(500).json({ error: `ERROR_UPDATE_USER_PROFILE: ${error}` });
//     }
// };

const updateUserProfile = async (req, res) => {
    console.log('Datos de la sesión:', req.session);
    try {
        const { userId } = req.session;

        // Verificar que el usuario esté autenticado
        if (!userId) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        // Filtrar solo los campos que se envían y contienen datos válidos
        const allowedFields = ['nombre', 'apellidos', 'email', 'telefono', 'direccion', 'altura', 'peso', 'deporte', 'mejor_marca'];
        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) { // Solo agregar si existe en req.body
                updates[field] = req.body[field];
            }
        });

        // Si no hay campos a actualizar, devolver un error o advertencia
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
        }

        // Realizar la actualización con los campos filtrados
        const [updatedRows] = await users.update(updates, {
            where: { id: userId },
            withCredentials: true
        });

        // Verificar si se actualizó algún registro
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado o no se pudo actualizar' });
        }

        // res.status(200).json({ message: 'Perfil actualizado exitosamente' });
        // Obtener los datos actualizados del usuario
        const updatedUser = await users.findOne({
            where: { id: userId },
            attributes: [
                'id', 'dni', 'email', 'nombre', 'apellidos', 'profile_complete', 'isAdminUser',
                'fecha_nacimiento', 'telefono', 'direccion', 'altura', 'peso', 'deporte', 'mejor_marca'
            ]
        });

        // Envolver los datos en un objeto `user` para mantener la consistencia con la estructura de respuesta esperada
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: `ERROR_UPDATE_USER_PROFILE: ${error.message}` });
    }
};

const logout = async (req, res) => {
    try {
        console.log("ID del usuario que está cerrando la sesión: " + req.session.userId);
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({error: `ERROR_LOGOUT: ${err}`});
            }
            res.clearCookie('connect.sid');
            res.status(200).json({message: 'Logout successfully'});
        });
    } catch (error) {
        res.status(500).json({error: `ERROR_LOGOUT: ${error}`});
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

// const getUserFromSession = async (req, res) => {
//     try {
//         const { userId } = req.session;
//         if (userId) {
//             const usuario = await users.findByPk(userId);
//             if (usuario) {
//                 res.status(200).json(usuario);
//             } else {
//                 res.status(404).json({error: 'User not found'});
//             }
//         } else {
//             res.status(401).json({error: 'Unauthorized'});
//         }
//     } catch (error) {
//         res.status(500).json({error: `ERROR_GET_USER_FROM_SESSION: ${error}`});
//     }
// }

const deleteUserFromSession = async (req, res) => {
    try {
        const { userId } = req.session;
        if (userId) {
            const usuario = await users.findByPk(userId);
            if (usuario) {
                await users.destroy({ where: { id: userId }, withCredentials: true } );
                res.status(200).json({message: 'User deleted successfully'});
            } else {
                res.status(404).json({error: 'User not found'});
            }
        } else {
            res.status(401).json({error: 'Unauthorized'});
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_DELETE_USER_FROM_SESSION: ${error}`});
    }
}

const getUserFromSession = async (req, res) => {
    try {
        const { userId } = req.session;
        if (userId) {
            const usuario = await users.findByPk(userId, {
                attributes: { exclude: ['password'] } // Excluir contraseña de la respuesta
            });
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } else {
            res.status(401).json({ error: 'No autorizado' });
        }
    } catch (error) {
        res.status(500).json({ error: `ERROR_GET_USER_FROM_SESSION: ${error}` });
    }
};

module.exports = { getAllUsers, registroUsers, loginUsers, logout, getUserById, updateUserById, deleteUserById, completeProfile, 
    getUserFromSession, userAdminExists, updateUserProfile, deleteUserFromSession };