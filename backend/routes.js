// backend/routes.js
const express = require('express');
const router = express.Router();
const skillController = require('./controllers/skillController');
const authController = require('./controllers/authController');
const { requireTecnico } = require('./middleware/authMiddleware');

// LOGIN
router.post('/api/login', authController.login);

// SKILLS
router.get('/api/skills', skillController.getAllSkills);
router.post('/api/skills', skillController.createSkill);
router.put('/api/skills/:id', skillController.updateSkill);
router.delete('/api/skills/:id', skillController.deleteSkill);

module.exports = router;
