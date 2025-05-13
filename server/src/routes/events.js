const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');
const verifySession = require('../middleware/verify-sessions');
const upload = require('../middleware/upload');

router.get('/events', eventController.getAllEvents);
router.get('/events/:id_evento/imagen', eventController.getEventImage);
router.get('/events/:id_evento', eventController.getEventById);
router.get('/events-available-user', verifySession, eventController.getAllEventsAndUserEventsFromUserLoggedIn);
router.post('/events', upload.single('imagen'), eventController.postEvent);
router.put('/events/:id_evento', eventController.updateEvent);
router.put('/events/update-status/:id_evento', eventController.updateEventStatus);
router.delete('/events/:id_evento', eventController.deleteEvent);

module.exports = router;
