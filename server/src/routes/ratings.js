const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingController');
const verifySession = require('../middleware/verify-sessions');

router.get('/ratings', ratingController.getAllRatings);
router.get('/ratings/:id_rating', ratingController.getRatingById);
router.post('/ratings', verifySession, ratingController.postRating);
router.put('/ratings/:id_rating', verifySession, ratingController.putRating);
router.delete('/ratings/:id_rating', ratingController.deletedRating);
router.get('/ratings/event/:id_evento', ratingController.getRatingsByEvent);
// router.get('/ratings/event/:id_evento', ratingController.getRatingByIdEvent);

module.exports = router;