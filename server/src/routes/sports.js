const express = require('express');
const router = express.Router();
const sportController = require('../controllers/SportController');

router.get('/sports', sportController.getAllSports);
router.get('/sports/:id', sportController.getSportById);
router.post('/sports/create-sports', sportController.postSport);
router.put('/sports/update-sports/:id', sportController.updateSport);
router.delete('/sports/:id', sportController.deleteSport);
router.get('/sports/events-from-sport/:id_deporte', sportController.getEventsFromSport);

module.exports = router;
