const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const verifySession = require('../middleware/verify-sessions');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/registro', userController.registroUsers);
router.post('/login', userController.loginUsers);
router.post('/logout', userController.logout);
router.put('/complete-profile/:id', userController.completeProfile);
// router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);
router.put('/update-profile', verifySession, userController.updateUserProfile);
router.get('/user-admin-exists', userController.userAdminExists);
router.get('/user-from-session', verifySession, userController.getUserFromSession);
router.delete('/delete-profile', verifySession, userController.deleteUserFromSession);

module.exports = router;
