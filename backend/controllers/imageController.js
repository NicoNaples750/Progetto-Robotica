const Image = require('../models/Image');
const multer = require('multer');

// Configura Multer per gestire l'upload di immagini
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const getImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server' });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nessun file caricato' });
    }
    
    const newImage = new Image({
      path: req.file.path,
      filename: req.file.filename,
    });

    await newImage.save();

    res.json({ message: 'Immagine caricata con successo!', image: newImage });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel caricamento dell\'immagine' });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: 'Immagine non trovata' });
    }

    res.json({ message: 'Immagine eliminata con successo!' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel cancellare l\'immagine' });
  }
};

const updateImageDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedImageDescription = await Image.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedImageDescription) {
      return res.status(404).json({ message: 'Immagine non trovata' });
    }

    res.json({ message: 'Immagine aggiornata con successo!', image: updatedImageDescription });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'aggiornamento dell\'immagine' });
  }
};

module.exports = { getImages, uploadImage, deleteImage, updateImageDescription };
