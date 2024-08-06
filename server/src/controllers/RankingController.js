const ranking = require('../models/Ranking');

const getAllRankings = async (req, res) => {
    try {
        const rankings = await ranking.findAll();
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
        const { id_usuario, id_deporte, id_evento, resultado, posicion } = req.body;
        const newRanking = await ranking.create({ id_usuario, id_deporte, id_evento, resultado, posicion });
        if (id_usuario && id_deporte && id_evento && resultado && posicion){
            res.status(201).json(newRanking);
        }
    } catch (error) {
        res.status(500).json({error: `ERROR_POST_RANKING: ${error}`})
    }
}

const putRanking = async (req, res) => {
    try {
        const { id_ranking } = req.params;
        const { resultado, posicion } = req.body;
        await ranking.update({ resultado, posicion }, 
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