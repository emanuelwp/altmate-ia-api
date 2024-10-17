const express = require('express');
const { describeImages, functiontest } = require('./controllers/gemini');
const router = express.Router();

router.post('/describe-images', describeImages);

module.exports = router;