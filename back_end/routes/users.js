const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/reset-password', userController.forgotPassword);
router.patch('/reset-password', userController.ResetPassword);
router.get('/reset-password', userController.ReenderResetPasswordPage);



module.exports = router;
