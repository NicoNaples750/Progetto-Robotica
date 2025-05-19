export default function handler(req, res) {
  const distribution = [
    { robot: "R2D2", count: 5 },
    { robot: "C3PO", count: 3 },
    { robot: "WALL-E", count: 2 },
  ];
  res.status(200).json(distribution);
}