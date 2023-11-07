const { Router } = require('express');
const passwordController = require('../controllers/passwordController');
const router = Router();

router.get('/forgot-password', passwordController.forgotPassword);
router.post('/forgot-password', passwordController.postForgotPassword);
router.get('/reset-password', passwordController.getResetPassword)
router.post('/reset-password', passwordController.postResetPassword)

module.exports = router;