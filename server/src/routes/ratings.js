const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingController');

router.get('/ratings', ratingController.getAllRatings);
router.get('/ratings/:id_rating', ratingController.getRatingById);
router.post('/ratings', ratingController.postRating);
router.put('/ratings/:id_rating', ratingController.putRating);
router.delete('/ratings/:id_rating', ratingController.deletedRating);

module.exports = router;