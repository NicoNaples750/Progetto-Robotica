export default function handler(req, res) {
  const { id } = req.query;
  const erroreId = parseInt(id);

  if (req.method === 'PUT') {
    const { stato } = req.body;
    // Trova e aggiorna l'errore simulato
    errori = errori.map(e => e.id === erroreId ? { ...e, stato } : e);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
