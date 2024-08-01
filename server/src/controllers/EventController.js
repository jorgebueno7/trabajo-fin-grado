const event = require('../models/Event');

const getAllEvents = async (req, res) => {
    try {
        const events = await event.findAll();
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
        const { id_deporte, fecha_ini, fecha_limite, lugar, hora_ini, maximo_usuarios } = req.body;
        const newEvent = await event.create({ id_deporte, fecha_ini, fecha_limite, lugar, hora_ini, maximo_usuarios });
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
        const { id_deporte, fecha_ini, fecha_limite, lugar, hora_ini, maximo_usuarios } = req.body;
        await event.update({ id_deporte, fecha_ini, fecha_limite, lugar, hora_ini, maximo_usuarios },
            { where: { id_evento } });
        res.status(200).json({message: 'Event updated successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_UPDATE_EVENT: ${error}`})
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { id_evento } = req.params;
        await event.destroy({ where: { id_evento } });
        res.status(200).json({message: 'Event deleted successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_DELETE_EVENT: ${error}`})
    }
}

module.exports = { getAllEvents, getEventById, postEvent, updateEvent, deleteEvent };