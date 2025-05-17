const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getImages, uploadImage, deleteImage } = require('../controllers/imageController');
const imageController = require('../controllers/imageController');
const auth = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', auth, imageController.getImages);
router.post('/', auth, upload.single('image'), imageController.uploadImage);
router.delete('/:id', auth, imageController.deleteImage);
router.put('/:id', auth, imageController.updateImageDescription);

module.exports = router;