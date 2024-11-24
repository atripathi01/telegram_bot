const express = require('express');
const UserChat = require('../controllers/botcontroller');
const router = express.Router();

router.get('/point/:username', UserChat)

module.exports = router;