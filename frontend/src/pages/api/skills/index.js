export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate"); // 🔥 Disattiviamo la cache del browser!
  res.setHeader("Expires", "0");
  res.setHeader("Pragma", "no-cache");

  let skills = [
    { id: 1, name: "Navigazione", level: "Avanzato" },
    { id: 2, name: "Manipolazione", level: "Intermedio" }
  ];

  if (req.method === "GET") {
    res.status(200).json({ skills });
  } else if (req.method === "POST") {
    const newSkill = { id: Date.now(), ...req.body };
    skills.push(newSkill);
    res.status(201).json(newSkill);
  } else if (req.method === "PUT") {
    const { id, name, level } = req.body;
    skills = skills.map(s =>
      s.id === id ? { ...s, name, level } : s
    );
    res.status(200).json({ success: true });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    skills = skills.filter(s => s.id !== id);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}


