const user_event = require('../models/UserEvent');

const getAllUserEvents = async (req, res) => {
    try {
        const user_events = await user_event.findAll();
        res.status(200).json(user_events);
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_ALL_USER_EVENTS: ${error}`})
    }
}

const getUsersByEventId = async (req, res) => {
    try {
        const { id_evento } = req.params;
        const user_events = await user_event.findAll({ where: {id_evento} });
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

const getEventByUserId = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const user_events = await user_event.findAll({ where: {id_usuario} });
        if (user_events){
            res.status(200).json(user_events);
        }
        else{
            res.status(404).json({error: 'UserEvents with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_EVENT_BY_USER_ID: ${error}`})
    }
}

const postUserEvent = async (req, res) => {
    try {
        const { id_usuario, id_evento } = req.body;
        const newUserEvent = await user_event.create({ id_usuario, id_evento });
        if(id_usuario && id_evento){
            res.status(201).json(newUserEvent);
        } 
    } catch (error) {
        res.status(500).json({ error: `ERROR_POST_USER_EVENT: ${error}`})
    }
}

const putUserEvent = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const { id_evento } = req.params;
        await user_event.update({ id_usuario },
            { where: { id_evento } });
        res.status(200).json({ message: 'UserEvent updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `ERROR_UPDATE_USER_EVENT: ${error}` })
    }
}

const deleteUserEvent = async (req, res) => {
    try {
        const { id_usuario, id_evento } = req.params;
        await user_event.destroy({ where: { id_usuario, id_evento } });
        res.status(200).json({ message: 'UserEvent deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `ERROR_DELETE_USER_EVENT: ${error}` });
    }
}

module.exports = { getAllUserEvents, getUsersByEventId, getEventByUserId, postUserEvent, putUserEvent, deleteUserEvent};