let errori = [
  { id: 1, data: '2025-05-15', descrizione: 'Errore sensore LIDAR', missione: 'Ispezione 23', stato: 'In sospeso' },
  { id: 2, data: '2025-05-14', descrizione: 'Timeout rete', missione: 'Trasporto materiali', stato: 'In sospeso' },
  { id: 3, data: '2025-05-16', descrizione: 'Errore batteria', missione: 'Ispezione 24', stato: 'In sospeso' },
];

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate"); // Disattiva cache
  res.setHeader("Expires", "0");
  res.setHeader("Pragma", "no-cache");

  if (req.method === "GET") {
    res.status(200).json(errori);
  } else if (req.method === "POST") {
    const nuovoErrore = { id: Date.now(), ...req.body };
    errori.push(nuovoErrore);
    res.status(201).json(nuovoErrore);
  } else if (req.method === "PUT") {
    const { id, stato } = req.body;
    errori = errori.map(e => e.id === id ? { ...e, stato } : e);
    res.status(200).json({ success: true });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    errori = errori.filter(e => e.id !== id);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}


