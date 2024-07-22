const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/users', userController.getAllUsers);
router.post('/registro', userController.registroUsers)
router.post('/login', userController.loginUsers)
module.exports = router;
