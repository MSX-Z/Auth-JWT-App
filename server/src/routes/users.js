const express = require('express');
const router = express.Router();

const controller = require('../controller/users');
const { verifyAccessToken } = require('../middleware/verify_token');

router.get('/:id', verifyAccessToken, controller.getUserInfo);

module.exports = router;