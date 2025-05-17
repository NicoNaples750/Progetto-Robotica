import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  const metaPath = path.join(process.cwd(), 'data', 'imageMeta.json');

  if (req.method === 'DELETE') {
    let images;

    try {
      const jsonData = fs.readFileSync(metaPath, 'utf8');
      images = JSON.parse(jsonData);
    } catch (e) {
      images = [];
    }

    if (!images || !Array.isArray(images)) {
      return res.status(500).json({ error: 'Errore nel caricamento dei dati immagini' });
    }

    const index = images.findIndex((img) => img.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Immagine non trovata' });
    }

    // Rimuovi l’immagine dall’array
    const [removedImage] = images.splice(index, 1);

    // (Opzionale) Rimuovi il file fisico dal filesystem
    const imagePath = path.join(process.cwd(), 'public', removedImage.imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Errore durante cancellazione file:', err);
        // Non bloccare la risposta, l’immagine è già rimossa dai metadati
      }
    });

    // Salva il file JSON aggiornato
    fs.writeFileSync(metaPath, JSON.stringify(images, null, 2));

    res.status(200).json({ message: 'Immagine eliminata con successo' });
  } else {
    res.status(405).json({ error: 'Metodo non permesso' });
  }
}

