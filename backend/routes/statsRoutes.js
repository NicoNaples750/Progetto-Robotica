const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { getStats } = require('../controllers/statsController');
const auth = require('../middleware/authMiddleware');

router.get('/status-count', auth, statsController.getStatusCount);
router.get('/skills-history', auth, statsController.getSkillsHistory);
router.get('/robot-distribution', auth, statsController.getRobotDistribution);

module.exports = router;