import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const MissionSchema = new mongoose.Schema({
  nome: String,
  descrizione: String,
  stato: String,
  priorita: String,
  data_creazione: { type: Date, default: Date.now },
});

const Mission = mongoose.models.Mission || mongoose.model('Mission', MissionSchema);

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI);
}

export default async function handler(req, res) {
  await connectToDB();

  const {
    query: { id },
    method,
    body,
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID non valido' });
  }

  switch (method) {
    case 'GET':
      try {
        const mission = await Mission.findById(id);
        if (!mission) return res.status(404).json({ message: 'Missione non trovata' });
        return res.status(200).json(mission);
      } catch (error) {
        return res.status(500).json({ message: 'Errore nel recupero della missione' });
      }

    case 'PUT':
      try {
        const { nome, descrizione, stato, priorita } = body;
        if (!nome || !descrizione) {
          return res.status(400).json({ message: 'Nome e descrizione obbligatori' });
        }

        const updatedMission = await Mission.findByIdAndUpdate(
          id,
          { nome, descrizione, stato: stato || 'in_attesa', priorita: priorita || 'Media' },
          { new: true, runValidators: true }
        );

        if (!updatedMission) return res.status(404).json({ message: 'Missione non trovata' });
        return res.status(200).json(updatedMission);
      } catch (error) {
        return res.status(500).json({ message: 'Errore nell\'aggiornamento della missione' });
      }

    case 'DELETE':
      try {
        const deletedMission = await Mission.findByIdAndDelete(id);
        if (!deletedMission) return res.status(404).json({ message: 'Missione non trovata' });
        return res.status(200).json({ message: 'Missione eliminata' });
      } catch (error) {
        return res.status(500).json({ message: 'Errore nell\'eliminazione della missione' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Metodo ${method} non consentito`);
  }
}



