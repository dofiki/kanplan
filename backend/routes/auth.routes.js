const express = require('express');

const router = express.Router();

const authenticationController = require('../controllers/auth.controller');

router.post('/signup', authenticationController.authenticationSignUp);
//router.post('/login');

module.exports = router;
