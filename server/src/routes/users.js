const express = require('express');
const router = express.Router();

const { validateAccessToken } = require('../middleware/validateToken');
const controller = require('../controller/users');

router.get('/:id', validateAccessToken, controller.getUserInfo);

module.exports = router;