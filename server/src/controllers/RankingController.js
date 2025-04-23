const ranking = require('../models/Ranking');
const events = require('../models/Event');
const sport = require('../models/Sports');
const user = require('../models/User');

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
        const { clasificacion, puntos, tiempo, resultado, observaciones, estadisticas_extra } = req.body;
        await ranking.update({ clasificacion, puntos, tiempo, resultado, observaciones, estadisticas_extra }, 
            { where: { id_ranking: id_ranking } });
        res.status(200).json({message: 'Ranking updated successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_UPDATE_RANKING: ${error}`})
    }
}

const deleteRanking = async (req, res) => {
    try {
        const { id_ranking } = req.params;
        await ranking.destroy({ where: { id_ranking: id_ranking } });
        res.status(200).json({message: 'Ranking deleted successfully'});
    } catch (error) {
        res.status(500).json({error: `ERROR_DELETE_RANKING: ${error}`})
    }
}

module.exports = { getAllRankings, getRankingById, postRanking, putRanking, deleteRanking }; 