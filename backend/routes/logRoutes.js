const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/logController'); // Assicurati che il controller esista

router.get('/', getLogs);

module.exports = router;
