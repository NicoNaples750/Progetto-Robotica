import { reports } from '../../../../data/reports';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(reports);
  }

  if (req.method === 'POST') {
    const { missionId, status, description } = req.body;
    if (!missionId || !status) {
      return res.status(400).json({ error: 'missionId e status sono obbligatori' });
    }
    const newReport = {
      id: Date.now(),
      missionId,
      status,
      description: description || '',
      createdAt: new Date().toISOString()
    };
    reports.push(newReport);
    return res.status(201).json(newReport);
  }

  return res.status(405).json({ error: 'Metodo non supportato' });
}



