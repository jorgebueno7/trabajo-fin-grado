const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/RankingController');

router.get('/rankings', rankingController.getAllRankings);
router.get('/rankings/:id_ranking', rankingController.getRankingById);
router.post('/rankings', rankingController.postRanking);
router.put('/rankings/:id_ranking', rankingController.putRanking);
router.delete('/rankings/:id_ranking', rankingController.deleteRanking);

module.exports = router;