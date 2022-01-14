const express = require('express');
const router = express.Router();

const controller = require('../controller/auth');
const validateToken = require('../middleware/validateToken');

router.get('/', validateToken, controller.validateToken);

router.post('/login', controller.login);

router.post('/register', controller.register);

module.exports = router;