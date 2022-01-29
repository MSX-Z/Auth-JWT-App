const express = require('express');
const router = express.Router();

const controller = require('../controller/auth');
const { verifyAccessToken, verifyRefreshToken } = require('../middleware/verify_token');

router.get('/', verifyAccessToken, controller.verifyAccessToken);

router.post('/refresh_token', verifyRefreshToken, controller.verifyRefreshToken);

router.post('/login', controller.login);

router.post('/register', controller.register);

module.exports = router;