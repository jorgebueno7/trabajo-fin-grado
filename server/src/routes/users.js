const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/registro', userController.registroUsers);
router.post('/login', userController.loginUsers);
router.post('/logout', userController.logout);
router.put('/complete-profile/:id', userController.completeProfile);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);
router.get('/user-from-session', userController.getUserFromSession);

module.exports = router;
