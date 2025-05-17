const Mission = require('../models/Mission');

// GET tutte le missioni
exports.getAllMissions = async (req, res) => {
  try {
    console.log('Richiesta GET /api/mission ricevuta');
    const missions = await Mission.find().sort({ data_creazione: -1 });

    missions.forEach(m => {
      console.log(`_id: ${m._id}, virtual id: ${m.id}`);
    });

    res.json(missions.map(m => m.toObject({ virtuals: true })));
  } catch (err) {
    console.error('Errore nel getAllMissions:', err);
    res.status(500).json({ error: err.message });
  }
};






// POST nuova missione
exports.createMission = async (req, res) => {
  try {
    const newMission = new Mission(req.body);
    await newMission.save();
    console.log("Missione creata:", newMission); // 👈 LOG IMPORTANTE
    res.status(201).json(newMission.toObject({ virtuals: true }));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// PUT aggiorna missione
exports.updateMission = async (req, res) => {
  try {
    const updated = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE elimina missione
exports.deleteMission = async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Missione eliminata' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
