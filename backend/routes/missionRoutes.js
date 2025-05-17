const express = require('express');
const controller = require('../controllers/missionController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', controller.getAllMissions);
router.post('/', controller.createMission);
router.put('/:id', controller.updateMission);
router.delete('/:id', controller.deleteMission);

module.exports = router;