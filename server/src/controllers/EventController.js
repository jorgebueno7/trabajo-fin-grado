const event = require('../models/Event');
const user = require('../models/User');
const sport = require('../models/Sports');

const getAllEvents = async (req, res) => {
    try {
        const events = await event.findAll(
            { include: [{ model: sport }] }
        );
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_ALL_EVENTS: ${error}`})
    }
}

const getEventById = async (req, res) => {
    try {
        const { id_evento } = req.params;
        const evento = await event.findByPk(id_evento);
        if (evento){
            res.status(200).json(evento);
        }
        else{
            res.status(404).json({error: 'Event with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_EVENT_BY_ID: ${error}`})
    }
}

const postEvent = async (req, res) => {
    try {
        const { id_deporte, nombre, fecha_ini, fecha_fin, fecha_limite, lugar, hora_ini, maximo_usuarios, clasificacion, estado } = req.body;
        const id_usuario = req.session.userId;
        if (!id_usuario) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const usuario = await user.findByPk(id_usuario);

        if (!usuario) {
            return res.status(404).json({ error: 'User not found' });
        }

        const createdBy = usuario.email; // Obtener el email del usuario desde la BD
        const newEvent = await event.create({ id_deporte, nombre, fecha_ini, fecha_fin, fecha_limite, lugar, hora_ini, maximo_usuarios, clasificacion, estado, createdBy });

        if(id_deporte && fecha_ini && fecha_limite && lugar 
            && hora_ini && maximo_usuarios){
            res.status(201).json(newEvent);
        } 
    } catch (error) {
        res.status(500).json({error: `ERROR_POST_EVENT: ${error}`})
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id_evento } = req.params;
        const { id_deporte, nombre, fecha_ini, fecha_fin, fecha_limite, lugar, hora_ini, maximo_usuarios, clasificacion, estado } = req.body;
        await event.update({ id_deporte, nombre, fecha_ini, fecha_fin, fecha_limite, lugar, hora_ini, maximo_usuarios, clasificacion, estado },
            { where: { id_evento } });

        const updatedEvent = await event.findByPk(id_evento);

        // Si no se encuentra el evento, retorna un error
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({message: 'Event updated successfully', evento: updatedEvent});
    } catch (error) {
        res.status(500).json({error: `ERROR_UPDATE_EVENT: ${error}`})
    }
}

const updateEventStatus = async (req, res) => {
    try {
        const { id_evento } = req.params;
        const { estado } = req.body;

        const evento = await event.findByPk(id_evento);
        if (!evento) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await evento.update({ estado });
        res.status(200).json({ message: 'Estado actualizado correctamente', evento });
    } catch (error) {
        res.status(500).json({ error: `ERROR_UPDATE_EVENT_STATUS: ${error}` });
    }
};


const deleteEvent = async (req, res) => {
    try {
        const { id_evento } = req.params;
        await event.destroy({ where: { id_evento } });
        res.status(200).json({message: 'Event deleted successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_DELETE_EVENT: ${error}`})
    }
}

module.exports = { getAllEvents, getEventById, postEvent, updateEvent, updateEventStatus, deleteEvent };