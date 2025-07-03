const ranking = require('../models/Ranking');
const events = require('../models/Event');
const sport = require('../models/Sports');
const user = require('../models/User');
const user_event = require('../models/UserEvent');

const getAllRankings = async (req, res) => {
    try {
        const rankings = await ranking.findAll(
            { include: [{ model: events }, { model: sport }, { model: user }]}
        );
        res.status(200).json(rankings);
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_ALL_RANKINGS: ${error}`})
    }
}

const getRankingById = async (req, res) => {
    try {
        const { id_ranking } = req.params;
        const rankings = await ranking.findByPk(id_ranking);
        if(rankings){
            res.status(200).json(rankings);
        }else{
            res.status(404).json({error: 'Ranking with that id does not exist'})
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_GET_RANKING_BY_ID: ${error}`})
    }
}

const postRanking = async (req, res) => {
    try { 
        const { id_usuario, id_deporte, id_evento, clasificacion, puntos, tiempo, resultado, observaciones, estadisticas_extra } = req.body;
        if (id_usuario && id_deporte && id_evento && clasificacion &&
            puntos && tiempo && resultado && observaciones && estadisticas_extra){
            const newRanking = await ranking.create({ id_usuario, id_deporte, id_evento, 
                    clasificacion, puntos, tiempo, resultado, observaciones, estadisticas_extra });
            res.status(201).json(newRanking);
        } else {
            res.status(400).json({error: 'Missing required fields'});
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_POST_RANKING: ${error}`})
    }
}

const putRanking = async (req, res) => {
    try {
        const { id_ranking } = req.params;

        // Buscar el ranking correspondiente
        const existingRanking = await ranking.findByPk(id_ranking);

        if (!existingRanking) {
            return res.status(404).json({ error: 'Ranking not found' });
        }

        // Extraer datos clave para buscar user_event
        const { id_evento, id_usuario } = existingRanking;

        const evento = await events.findByPk(id_evento);
        if (!evento) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const {
            clasificacion,
            puntos,
            tiempo,
            resultado,
            observaciones,
            estadisticas_extra,
        } = req.body;

        // Buscar relación user-event
        const userEvent = await user_event.findOne({
            where: { id_evento, id_usuario }
        });

        if (!userEvent) {
            return res.status(404).json({ error: 'User is not registered in the event' });
        }

        // Actualizar user_event
        await userEvent.update({
            clasificacion,
            puntos,
            tiempo,
            resultado,
            observaciones,
            estadisticas_extra,
        });

        // Actualizar ranking
        await existingRanking.update({
            clasificacion,
            puntos,
            tiempo,
            resultado,
            observaciones,
            estadisticas_extra,
        });

        res.status(200).json({
            message: 'Estadísticas actualizadas correctamente',
            userEvent,
            ranking: existingRanking
        });
    } catch (error) {
        res.status(500).json({ error: `ERROR_ADD_STATS_BY_RANKING_ID: ${error}` });
    }
};


const deleteRanking = async (req, res) => {
    try {
        const { id_ranking } = req.params;

        // Primero obtener el ranking para saber qué id_evento y id_usuario usar para actualizar user_event
        const rankingToDelete = await ranking.findByPk(id_ranking);

        if (!rankingToDelete) {
            return res.status(404).json({ error: 'Ranking no encontrado' });
        }

        // Actualizar user_event: poner a null los campos relacionados
        await user_event.update(
            {
                clasificacion: null,
                puntos: null,
                tiempo: null,
                resultado: null,
                observaciones: null,
                estadisticas_extra: null
            },
            {
                where: {
                    id_evento: rankingToDelete.id_evento,
                    id_usuario: rankingToDelete.id_usuario
                }
            }
        );

        // Luego eliminar el ranking
        await ranking.destroy({ where: { id_ranking } });

        res.status(200).json({ message: 'Ranking eliminado y user_event actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: `ERROR_DELETE_RANKING: ${error}` });
    }
};

module.exports = { getAllRankings, getRankingById, postRanking, putRanking, deleteRanking }; 