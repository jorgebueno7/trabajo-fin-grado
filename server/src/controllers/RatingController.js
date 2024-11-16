const rating = require('../models/Rating')
const event = require('../models/Event')
const user = require('../models/User')

const getAllRatings = async (req, res) => {
    try {
        const ratings = await rating.findAll({
            include: [
                {
                    model: event,
                    attributes: ['nombre'],
                },
                {
                    model: user,
                    attributes: ['email'],
                }
            ]
        });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_ALL_RATINGS: ${error}`})
    }
}

const getRatingById = async (req, res) => { // Función de Administrador
    try {
        const { id_rating } = req.params;
        const ratings = await rating.findByPk(id_rating);
        if(ratings){
            res.status(200).json(ratings);
        }else{
            res.status(404).json({error: 'Rating with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_RATING_BY_ID: ${error}`})
    }
}

// const getRatingByIdEvent = async (req, res) => {
//     try {
//         const { id_evento } = req.params;
//         const ratings = await rating.findAll({ where: { id_evento } });
//         if(ratings){
//             res.status(200).json(ratings);
//         }else{
//             res.status(404).json({error: 'Rating with that id does not exist'})
//         }
//     } catch (error) {
//         res.status(500).json({error: `ERROR_GET_RATING_BY_ID_EVENT: ${error}`})
//     }
// }

const postRating = async (req, res) => {
    try { 
        const id_usuario = req.session.userId;
        const { id_evento, valoracion, comentario } = req.body;
        const newRating = await rating.create({ id_usuario, id_evento, valoracion, comentario });
        if (id_usuario && id_evento && valoracion){
            res.status(201).json(newRating);
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_POST_RATING: ${error}`})
    }
}

const putRating = async (req, res) => {
    try {
        const { id_rating } = req.params;
        const { valoracion, comentario } = req.body;
        await rating.update({ valoracion, comentario }, 
            { where: { id_rating: id_rating } });
        res.status(200).json({message: 'Rating updated successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_UPDATE_RATING: ${error}`})
    }
}

const deletedRating = async (req, res) => {
    try {
        const { id_rating } = req.params;
        await rating.destroy({ where: { id_rating: id_rating } });
        res.status(200).json({message: 'Rating deleted successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_DELETE_RATING: ${error}`})
    }
}

const getRatingsByEvent = async (req, res) => {
    try {
        const { id_evento } = req.params;
        const eventRating = await rating.findAll({
            include: [
                {
                    model: event,
                    attributes: ['nombre'],
                },
                {
                    model: user,
                    attributes: ['email'],
                }
            ],
            where: { id_evento },
        });

        if (eventRating.length > 0) {
            res.status(200).json(eventRating);
        } else {
            res.status(404).json({ message: 'No ratings found for this event' });
        }
    } catch (error) {
        res.status(500).json({ error: `ERROR_GET_RATINGS_BY_EVENT: ${error}` });
    }
};


module.exports = { getAllRatings, getRatingById, postRating, putRating, deletedRating, 
    getRatingsByEvent }; 