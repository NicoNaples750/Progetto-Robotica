import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // disabilitiamo il body parser per usare formidable
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
const jsonFilePath = path.join(process.cwd(), 'data', 'imageMeta.json');

// Funzioni helper per leggere e scrivere metadata
function readImageMeta() {
  if (!fs.existsSync(jsonFilePath)) {
    fs.writeFileSync(jsonFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(jsonFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeImageMeta(data) {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Ritorna la lista immagini
    const images = readImageMeta();
    return res.status(200).json(images);
  }

  if (req.method === 'POST') {
    // Caricamento immagine + titolo + descrizione

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      filename: (name, ext, part, form) => {
        // Per mantenere nome originale con timestamp
        return `${Date.now()}_${part.originalFilename}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Errore caricamento immagine:', err);
        return res.status(500).json({ error: 'Errore caricamento immagine' });
      }

      if (!files.file) {
        return res.status(400).json({ error: 'Nessun file caricato' });
      }

      const filePath = files.file.filepath || files.file.path; // path temporaneo salvato da formidable
      const fileName = path.basename(filePath);
      const imageUrl = `/uploads/${fileName}`;

      // Prendi titolo e descrizione dal form
      const title = fields.title || 'No title';
      const description = fields.description || 'No description';

      // Leggi dati esistenti, aggiungi la nuova immagine
      const images = readImageMeta();

      const newImage = {
        id: Date.now(),
        title,
        description,
        imageUrl,
      };

      images.push(newImage);
      writeImageMeta(images);

      return res.status(200).json(newImage);
    });
    return; // importante per non continuare dopo form.parse
  }

  if (req.method === 'DELETE') {
    // elimina immagine per id passato via query ?id=xxx
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'ID mancante' });

    let images = readImageMeta();
    const imageIndex = images.findIndex((img) => img.id === parseInt(id));
    if (imageIndex === -1) return res.status(404).json({ error: 'Immagine non trovata' });

    // Rimuovi file fisico dell'immagine
    const imageToDelete = images[imageIndex];
    const filePath = path.join(process.cwd(), 'public', imageToDelete.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Rimuovi dal JSON
    images.splice(imageIndex, 1);
    writeImageMeta(images);

    return res.status(200).json({ message: 'Immagine eliminata' });
  }

  if (req.method === 'PUT') {
    // Aggiorna titolo/descrizione immagine tramite id nel body
    try {
      const { id, title, description } = JSON.parse(req.body);
      if (!id) return res.status(400).json({ error: 'ID mancante' });

      let images = readImageMeta();
      const imageIndex = images.findIndex((img) => img.id === id);
      if (imageIndex === -1) return res.status(404).json({ error: 'Immagine non trovata' });

      if (title) images[imageIndex].title = title;
      if (description) images[imageIndex].description = description;

      writeImageMeta(images);
      return res.status(200).json(images[imageIndex]);
    } catch (e) {
      return res.status(400).json({ error: 'Body non valido' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
  res.status(405).end(`Metodo ${req.method} non consentito`);
}


