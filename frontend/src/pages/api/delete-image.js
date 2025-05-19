import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ error: 'Nome file mancante' });
  }

  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'Immagine eliminata' });
  } catch (error) {
    console.error('Errore eliminazione:', error);
    res.status(500).json({ error: 'Errore durante l\'eliminazione' });
  }
}
