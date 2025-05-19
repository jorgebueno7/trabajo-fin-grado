const sport = require('../models/Sports');
const event = require('../models/Event');

const getAllSports = async (req, res) => {
    try {
        const sports = await sport.findAll();
        res.status(200).json(sports);
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_ALL_SPORTS: ${error}`})
    }
}

const getSportById = async (req, res) => {
    try {
        const { id } = req.params;
        const sportById = await sport.findByPk(id);
        if(sportById){
            res.status(200).json(sportById);
        }else{
            res.status(404).json({error: 'Sport with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_SPORT_BY_ID: ${error}`})
    }
}

const postSport = async (req, res) => {
    try { 
        const { nombre, descripcion, informacion, categoria, equipamiento } = req.body;
        const imagen = req.file ? req.file.buffer : null; // nombre del archivo

        const newSport = await sport.create({ nombre, descripcion, informacion, categoria, equipamiento, imagen });
        if (nombre && categoria && equipamiento){
            res.status(201).json(newSport);
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_POST_SPORT: ${error}`})
    }
}

const updateSport = async (req, res) => {
    try {
        const { id } = req.params;
        const imagen = req.file ? req.file.buffer : null; // nombre del archivo
        const { nombre, descripcion, informacion, categoria, equipamiento } = req.body;

        // await sport.update({ nombre, descripcion, informacion, categoria, equipamiento, imagen }, 
        //     { where: { id_deporte: id } });

        const updateData = { nombre, descripcion, informacion, categoria, equipamiento };
        if (imagen) {
            updateData.imagen = imagen;
        }

        await sport.update(updateData, { where: { id_deporte: id } });
        res.status(200).json({message: 'Sport updated successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_UPDATE_SPORT: ${error}`})
    }
}

const deleteSport = async (req, res) => {
    try {
        const { id } = req.params;
        await event.destroy({ where: { id_deporte: id } }); // Elimina todos los eventos asociados a ese deporte
        await sport.destroy({ where: { id_deporte: id } });
        res.status(200).json({message: 'Sport deleted successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_DELETE_SPORT: ${error}`})
    }
}

const getEventsFromSport = async (req, res) => {
    try {
        const { id_deporte } = req.params;
        const sportById = await sport.findByPk(id_deporte);
        if(sportById){
            const events = await event.findAll({ where: { id_deporte: id_deporte } });
            res.status(200).json(events);
        }else{
            res.status(404).json({error: 'Sport with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_EVENTS_FROM_SPORT: ${error}`})
    }
}

const getSportImage = async (req, res) => {
    try {
        const { id } = req.params;
        const sportById = await sport.findByPk(id);
        if(sportById){
            res.set('Content-Type', 'image/jpeg');
            res.status(200).send(sportById.imagen);
        }else{
            res.status(404).json({error: 'Sport with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_SPORT_IMAGE: ${error}`})
    }
}

module.exports = { getAllSports, getSportById, postSport, updateSport, 
    deleteSport, getEventsFromSport, getSportImage };
