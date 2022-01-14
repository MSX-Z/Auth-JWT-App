const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const controller = require('../controller/users');

router.get('/:id', validateToken, controller.getUserInfo);

module.exports = router;