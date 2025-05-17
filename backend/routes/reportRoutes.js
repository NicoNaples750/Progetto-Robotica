const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET tutti i report
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST un nuovo report
router.post('/', async (req, res) => {
  const { missionId, status, description } = req.body;

  if (!missionId || !status) {
    return res.status(400).json({ message: 'missionId e status sono obbligatori' });
  }

  try {
    const newReport = new Report({ missionId, status, description });
    const saved = await newReport.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE un report
router.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report non trovato' });
    res.json({ message: 'Eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
