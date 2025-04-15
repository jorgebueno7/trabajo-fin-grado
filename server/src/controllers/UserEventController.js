const user_event = require('../models/UserEvent');
const event = require('../models/Event')
const sport = require('../models/Sports');
const user = require('../models/User');
let queue = {};

const getAllUserEvents = async (req, res) => {
    try {
        const user_events = await user_event.findAll({
            include: [
                { model: user }, 
                { model: event, include: [{ model: sport }] }]
    });
        res.status(200).json(user_events);
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_ALL_USER_EVENTS: ${error}`})
    }
}

const getUsersByEventId = async (req, res) => {
    try {
        const { id_evento } = req.params;
        const user_events = await user_event.findAll({ 
            include: [{ model: user }, 
                { model: event, include: [{ model: sport }]}],
            where: {id_evento} });
        if (user_events){
            res.status(200).json(user_events);
        }
        else{
            res.status(404).json({error: 'UserEvents with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_USERS_BY_EVENT_ID: ${error}`})
    }
}

// const getEventByUserLoggedIn = async (req, res) => {
//     try {
//         const userId = req.session.userId;
//         if (!userId) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }
//         const userEvents = await user_event.findAll({
//             where: { id_usuario: userId },
//             include: [{ model: event, include: [{ model: sport }] }],
//         });
//         if (userEvents.length > 0) {
//             res.status(200).json(userEvents);
//         }
//         else{
//             res.status(404).json({error: 'UserEvents with that id does not exist'})
//         }
//     } catch (error) {
//         res.status(500).json({error: `ERROR_GET_EVENT_BY_USER_ID: ${error}`})
//     }
// }

const getEventByUserLoggedIn = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userEvents = await user_event.findAll({
            where: { id_usuario: userId },
            include: [{ model: event, include: [{ model: sport }] }],
        });
        res.status(200).json(userEvents || []); 
    } catch (error) {
        res.status(500).json({ error: `ERROR_GET_EVENT_BY_USER_ID: ${error}` });
    }
};

const getEventByOrganizer = async (req, res) => {
    try {
        const id_usuario = req.session.userId; // Obtiene el ID del usuario logueado
        if (!id_usuario) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Obtiene el email del usuario logueado
        const usuario = await user.findByPk(id_usuario);

        if (!usuario) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Realiza la búsqueda de los eventos donde el createdBy coincida con el email del organizador
        const userEvents = await event.findAll({
            where: { createdBy: usuario.email }, // Filtra solo los eventos creados por el organizador
            include: [{ model: sport }], // Incluye el deporte asociado al evento
        });

        // Si no se encuentran eventos, se retorna un mensaje indicando que no hay eventos
        if (userEvents.length === 0) {
            return res.status(404).json({ error: 'No events found for this organizer' });
        }

        // Devuelve los eventos encontrados
        return res.status(200).json(userEvents);
    } catch (error) {
        return res.status(500).json({ error: `ERROR_GET_EVENT_BY_USER_ID: ${error}` });
    }
};


const postUserEvent = async (req, res) => {
    try {
        const id_usuario = req.session.userId;
        const { id_evento } = req.body;
        // Obtener el evento a través de la clave primaria
        const evento = await event.findByPk(id_evento);
        if (!evento) { // Si el evento no existe, devolver un 404
            return res.status(404).json({ error: 'Event not found' });
        }
        // Contar los usuarios actuales en el evento
        const currentUsersCount = await user_event.count({ where: { id_evento } });
        if (currentUsersCount < evento.maximo_usuarios) { // Si el número de usuarios de los eventos, es menor al máximo permitido por el evento
            // Crear un nuevo usuario en el evento
            const newUserEvent = await user_event.create({ id_usuario, id_evento });
            return res.status(201).json(newUserEvent);
        } else { // Si el evento está lleno, añadir el usuario a la cola
            if (!queue[id_evento]) {
                queue[id_evento] = [];
            }
            queue[id_evento].push(id_usuario); // Añadimos el id del usuario

            const firstUserInQueue = queue[id_evento][0];
            await event.update(
                { id_usuario_espera: firstUserInQueue }, // Actualizar el campo de id_usuario_espera con el primer usuario en la cola para el evento
                { where: { id_evento } }
            );
            // Devolver un mensaje de éxito mostrando el contenido de la cola
            return res.status(200).json({ message: 'User added to the waiting list for the event', queue: queue[id_evento] });
        }
    } catch (error) {
        res.status(500).json({ error: `ERROR_POST_USER_EVENT: ${error}`})
    }
}

const putUserEvent = async (req, res) => {
    try {
        const { clasificacion } = req.body;
        const { id_evento } = req.params;
        const id_usuario = req.session.userId;
        await user_event.update(
            { clasificacion },
            { where: { id_evento, id_usuario } }
        );
        res.status(200).json({ message: 'UserEvent updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `ERROR_UPDATE_USER_EVENT: ${error}` })
    }
}

// const deleteUserEvent = async (req, res) => {
//     try {
//         const id_usuario = req.session.userId;
//         const { id_evento } = req.params;
//         await user_event.destroy({ where: { id_usuario, id_evento } });
//         if (queue[id_evento] && queue[id_evento].length > 0) { // Verificar si hay usuarios en la cola esperando
//             // Obtener el siguiente usuario en la cola
//             const nextUser = queue[id_evento].shift();
//             await user_event.create({ id_usuario: nextUser, id_evento }); 

//             // Actualizar (si existe) el id_usuario_espera al siguiente usuario en la cola, sino, volver a ponerlo null
//             const firstUserInQueue = queue[id_evento][0] || null;
//             await event.update(
//                 { id_usuario_espera: firstUserInQueue },
//                 { where: { id_evento } }
//             );
//             console.log(`User ${nextUser} added to the event from the waiting list`);
//         } else {
//             await event.update({ id_usuario_espera: null }, { where: { id_evento } });
//         }
//         res.status(200).json({ message: 'UserEvent deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: `ERROR_DELETE_USER_EVENT: ${error}` });
//     }
// }
const deleteUserEvent = async (req, res) => {
    try {
        const id_usuario = req.session.userId; // Usamos la sesión para obtener el id del usuario
        if (!id_usuario) {
            return res.status(400).json({ error: 'User is not logged in' });
        }

        const { id_evento } = req.params;

        // Asegurarse de que el evento y el usuario existan
        const userEvent = await user_event.findOne({ where: { id_usuario, id_evento } });
        if (!userEvent) {
            return res.status(404).json({ error: 'User not found for this event' });
        }

        await user_event.destroy({ where: { id_usuario, id_evento } });

        if (queue[id_evento] && queue[id_evento].length > 0) {
            // Si hay usuarios en la cola de espera
            const nextUser = queue[id_evento].shift();
            await user_event.create({ id_usuario: nextUser, id_evento });

            const firstUserInQueue = queue[id_evento][0] || null;
            await event.update(
                { id_usuario_espera: firstUserInQueue },
                { where: { id_evento } }
            );
            console.log(`User ${nextUser} added to the event from the waiting list`);
        } else {
            await event.update({ id_usuario_espera: null }, { where: { id_evento } });
        }

        res.status(200).json({ message: 'UserEvent deleted successfully' });
    } catch (error) {
        console.error('ERROR_DELETE_USER_EVENT:', error);
        res.status(500).json({ error: `ERROR_DELETE_USER_EVENT: ${error.message}` });
    }
}

const addUserEventStats = async (req, res) => {
    try {
        // const { id_evento } = req.params;
        const { id_evento, id_usuario } = req.params;

        const {
            clasificacion,
            puntos,
            tiempo,
            resultado,
            observaciones,
            estadisticas_extra,
        } = req.body;

        const userEvent = await user_event.findOne({
            where: { id_evento, id_usuario }
        });

        if (!userEvent) {
            return res.status(404).json({ error: 'User is not registered in the event' });
        }

        await userEvent.update({
            clasificacion,
            puntos,
            tiempo,
            resultado,
            observaciones,
            estadisticas_extra,
        });

        res.status(200).json({ message: 'Estadísticas actualizadas correctamente', userEvent });
    } catch (error) {
        res.status(500).json({ error: `ERROR_ADD_STATS_USER_EVENT: ${error}` });
    }
};


module.exports = { getAllUserEvents, getUsersByEventId, getEventByUserLoggedIn, 
    postUserEvent, putUserEvent, deleteUserEvent, getEventByOrganizer, addUserEventStats };