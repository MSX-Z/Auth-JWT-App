const express = require('express');
const router = express.Router();

const { validateAccessToken } = require('../middleware/validateToken');
const controller = require('../controller/auth');

router.get('/', validateAccessToken, controller.validateAccessToken);

router.post('/login', controller.login);

router.post('/register', controller.register);

router.post('/refresh_token', controller.refreshToken);

module.exports = router;