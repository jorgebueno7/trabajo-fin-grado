const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');

router.get('/events', eventController.getAllEvents);
router.get('/events/:id_evento', eventController.getEventById);
router.post('/events', eventController.postEvent);
router.put('/events/:id_evento', eventController.updateEvent);
router.delete('/events/:id_evento', eventController.deleteEvent);

module.exports = router;
