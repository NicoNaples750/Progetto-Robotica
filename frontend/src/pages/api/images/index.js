let images = [
  { id: 1, url: "/images/panorama1.jpg", title: "Vista 1", description: "Zona nord" },
  { id: 2, url: "/images/panorama2.jpg", title: "Vista 2", description: "Zona sud" },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(images);
  } else if (req.method === "POST") {
    const newImage = { id: Date.now(), ...req.body };
    images.push(newImage);
    res.status(201).json(newImage);
  } else if (req.method === "PUT") {
    const { id, title, description } = req.body;
    images = images.map(img =>
      img.id === id ? { ...img, title, description } : img
    );
    res.status(200).json({ success: true });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    images = images.filter(img => img.id !== id);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}