const express = require('express');
const router = express.Router();
const userEvent = require('../controllers/UserEventController');
const verifySession = require('../middleware/verify-sessions');

router.get('/user-events', userEvent.getAllUserEvents);
router.get('/user-events/event/:id_evento', userEvent.getUsersByEventId);
// router.get('/user-events/user/:id_usuario', userEvent.getEventByUserId);
router.get('/user-events/events-logged-in', verifySession, userEvent.getEventByUserLoggedIn);
router.get('/user-events/organizer', verifySession, userEvent.getEventByOrganizer);
router.post('/user-events', verifySession, userEvent.postUserEvent);

router.put('/user-events/:id_evento', userEvent.putUserEvent);
router.delete('/user-events/event/:id_evento', verifySession, userEvent.deleteUserEvent);
router.put('/user-events/:id_evento/stats/:id_usuario', userEvent.addUserEventStats);
router.get('/user-events/notifications', verifySession, userEvent.getNotificationsFromUserEvent);
router.put('/user-events/notifications/:id_evento', verifySession, userEvent.putNotificarUnionFalse);

module.exports = router;