import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // disabilito body parser nativo di Next.js
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
      maxFiles: 1,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Errore parsing form:', err);
        return res.status(500).json({ error: 'Errore durante il parsing del form' });
      }

      console.log('files ricevuti:', files); // debug per capire nome campo

      // Sostituisci 'file' con il nome del campo corretto che usi nel formData
      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file) {
        return res.status(400).json({ error: 'File non trovato' });
      }

      const oldPath = file.filepath;

      if (!oldPath) {
        return res.status(500).json({ error: 'Percorso file temporaneo non trovato' });
      }

      const originalName = file.originalFilename || file.name || 'unknown';
      const newFileName = Date.now() + path.extname(originalName);
      const newPath = path.join(process.cwd(), 'public', 'uploads', newFileName);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('Errore durante il salvataggio del file:', err);
          return res.status(500).json({ error: 'Errore durante il salvataggio del file' });
        }

        const metaPath = path.join(process.cwd(), 'data', 'imageMeta.json');
        let imagesMeta = [];

        try {
          const jsonData = fs.readFileSync(metaPath, 'utf8');
          imagesMeta = JSON.parse(jsonData);
        } catch (e) {
          imagesMeta = [];
        }

        const newImage = {
          id: Date.now(),
          title: fields.title || '',
          description: fields.description || '',
          imageUrl: `/uploads/${newFileName}`,
        };

        imagesMeta.push(newImage);
        fs.writeFileSync(metaPath, JSON.stringify(imagesMeta, null, 2));

        res.status(200).json({ imageUrl: newImage.imageUrl });
      });
    });
  } else {
    res.status(405).json({ error: 'Metodo non permesso' });
  }
}





