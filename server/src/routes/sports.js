const express = require('express');
const router = express.Router();
const sportController = require('../controllers/SportController');

router.get('/sports', sportController.getAllSports);
router.get('/sports/:id', sportController.getSportById);
router.post('/create-sports', sportController.postSport);
router.put('/update-sports/:id', sportController.updateSport);
router.delete('/delete-sports/:id', sportController.deleteSport);

module.exports = router;
