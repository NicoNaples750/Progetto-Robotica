const connectDB = require('../../../backend/config/db');
const Mission = require('../../../backend/models/Mission'); // aggiusta percorso modello

export default async function handler(req, res) {
  try {
    await connectDB();

    const { method, body } = req;

    switch (method) {
      case 'GET':
        const missions = await Mission.find({});
        return res.status(200).json(missions);

      case 'POST':
        const { nome, descrizione, stato, priorita } = body;
        if (!nome || !descrizione) {
          return res.status(400).json({ message: 'Nome e descrizione obbligatori' });
        }
        const newMission = new Mission({
          nome,
          descrizione,
          stato: stato || 'in_attesa',
          priorita: priorita || 'Media',
          data_creazione: new Date(),
        });
        await newMission.save();
        return res.status(201).json(newMission);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Metodo ${method} non consentito`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
}






