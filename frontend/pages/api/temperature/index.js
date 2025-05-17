export default function handler(req, res) {
  if (req.method === 'GET') {
    const mockTemperature = parseFloat((Math.random() * 40 + 50).toFixed(1)); // 50-90°C
    const mockStatus = mockTemperature > 75 ? 'Allarme' : 'Normale';

    res.status(200).json({
      temperature: mockTemperature,
      status: mockStatus,
    });
  } else {
    res.status(405).json({ message: 'Metodo non consentito' });
  }
}

