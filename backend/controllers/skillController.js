const Skill = require('../models/Skill');

// GET: Recupera tutte le skill
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server' });
  }
};

// POST: Aggiunge una nuova skill
const addSkill = async (req, res) => {
  try {
    console.log("✅ Dati ricevuti nel backend:", req.body);
    const { name, level } = req.body;

    if (!name || !level) {
      return res.status(400).json({ error: "Nome e livello sono obbligatori!" });
    }

    const skill = new Skill({ name, level });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error("❌ Errore nel backend:", error);
    res.status(500).json({ error: "Errore interno nel server!" });
  }
};

// PUT: Modifica una skill esistente
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level } = req.body;

    if (!name || !level) {
      return res.status(400).json({ error: "Nome e livello sono obbligatori!" });
    }

    const updated = await Skill.findByIdAndUpdate(id, { name, level }, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Skill non trovata" });
    }

    res.json(updated);
  } catch (error) {
    console.error("❌ Errore durante l'update:", error);
    res.status(500).json({ error: "Errore interno durante la modifica" });
  }
};

// DELETE: Elimina una skill
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Skill.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Skill non trovata" });
    }

    res.json({ message: "Skill eliminata con successo" });
  } catch (error) {
    console.error("❌ Errore durante l'eliminazione:", error);
    res.status(500).json({ error: "Errore interno durante l'eliminazione" });
  }
};

module.exports = {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
};
