const express = require('express');
const router = express.Router();
const userEvent = require('../controllers/UserEventController');
const verifySession = require('../middleware/verify-sessions');

// router.get('/user-events', userEvent.getAllUserEvents);
router.get('/user-events/event/:id_evento', userEvent.getUsersByEventId);
// router.get('/user-events/user/:id_usuario', userEvent.getEventByUserId);
router.get('/user-events', verifySession, userEvent.getEventByUserLoggedIn);

router.post('/user-events', userEvent.postUserEvent);
router.put('/user-events/:id_evento', userEvent.putUserEvent);
router.delete('/user-events/event/:id_evento/user/:id_usuario', userEvent.deleteUserEvent);

module.exports = router;