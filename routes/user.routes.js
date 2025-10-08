const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const verifyAuth = require('../middleware/auth');

//router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/dashboard', verifyAuth.checkAuth, UserController.dashboard)


module.exports = router;