export default function handler(req, res) {
  const history = [
    { date: "2024-03-01", count: 2 },
    { date: "2024-03-10", count: 4 },
    { date: "2024-03-15", count: 1 },
    { date: "2024-03-22", count: 3 },
  ];
  res.status(200).json(history);
}