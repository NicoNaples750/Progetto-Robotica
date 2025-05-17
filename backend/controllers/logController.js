const Log = require('../models/Log'); // Assicurati che `logModel.js` esista e sia corretto

const getLogs = async (req, res) => {
  try {
    const logs = await Log.find({});
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Errore nel recupero dei log" });
  }
};

module.exports = { getLogs };
