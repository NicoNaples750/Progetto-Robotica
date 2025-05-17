const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");

// GET tutte le skill
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    console.log(" Skills inviate al frontend:", skills);
    res.json(skills);
  } catch (error) {
    console.error("Errore nel recupero delle skills:", error);
    res.status(500).json({ error: "Errore nel recupero delle skills" });
  }
});

// POST nuova skill
router.post("/", async (req, res) => {
  try {
    const { name, level } = req.body;

    const validLevels = ['Base', 'Intermedio', 'Avanzato'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ error: 'Livello non valido. Usa: Base, Intermedio, Avanzato' });
    }

    const newSkill = new Skill({ name, level });
    const savedSkill = await newSkill.save();

    res.status(201).json(savedSkill);
  } catch (error) {
    console.error("Errore nel salvataggio della skill:", error);
    res.status(500).json({ error: "Errore nel salvataggio della skill" });
  }
});

// 📝 PUT: Modifica una skill esistente
router.put("/:id", async (req, res) => {
  try {
    const { name, level } = req.body;

    const validLevels = ['Base', 'Intermedio', 'Avanzato'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ error: 'Livello non valido. Usa: Base, Intermedio, Avanzato' });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, level },
      { new: true, runValidators: true }
    );


    if (!updatedSkill) {
      return res.status(404).json({ error: "Skill non trovata" });
    }

    console.log("🔄 Skill aggiornata:", updatedSkill);
    res.json(updatedSkill);
  } catch (error) {
    console.error("❌ Errore nell'aggiornamento della skill:", error);
    res.status(500).json({ error: "Errore nell'aggiornamento della skill" });
  }
});

// ❌ DELETE: Elimina una skill esistente
router.delete("/:id", async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

    if (!deletedSkill) {
      return res.status(404).json({ error: "Skill non trovata" });
    }

    console.log("🗑️ Skill eliminata:", deletedSkill);
    res.json({ message: "Skill eliminata con successo" });
  } catch (error) {
    console.error("❌ Errore nell'eliminazione della skill:", error);
    res.status(500).json({ error: "Errore nell'eliminazione della skill" });
  }
});

module.exports = router;
