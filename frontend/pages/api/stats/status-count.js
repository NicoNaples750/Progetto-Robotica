export default function handler(req, res) {
  const status = {
    completed: 12,
    ongoing: 4,
    failed: 1,
  };
  res.status(200).json(status);
}