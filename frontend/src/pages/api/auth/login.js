// frontend/pages/api/auth/login.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body), // Invia i dati di login
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data); // Risposta positiva
      } else {
        res.status(response.status).json(data); // Risposta di errore
      }
    } catch (error) {
      res.status(500).json({ error: "Errore nel login." });
    }
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}
