export default function handler(req, res) {
  const events = [
    {
      id: 1,
      time: "2024-03-20T09:00:00Z",
      title: "Inizio missione Alpha",
      description: "Missione Alpha avviata con robot R2D2",
    },
    {
      id: 2,
      time: "2024-03-20T12:30:00Z",
      title: "Aggiornamento skill",
      description: "R2D2 ha ricevuto aggiornamento software v2.3",
    },
  ];

  res.status(200).json(events);
}