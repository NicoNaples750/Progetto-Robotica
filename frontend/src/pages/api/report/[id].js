import { reports } from '../../../data/reports';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    const idNum = Number(id);
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'ID non valido' });
    }

    const index = reports.findIndex((r) => r.id === idNum);
    if (index === -1) {
      return res.status(404).json({ error: 'Report non trovato' });
    }

    reports.splice(index, 1);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Metodo non supportato' });
}





