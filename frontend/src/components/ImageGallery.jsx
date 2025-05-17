import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Images.module.css';

export default function ImageGallery() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('/api/images');
      setImages(res.data);
    } catch (err) {
      console.error('Errore nel recupero immagini:', err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await axios.post('/api/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTitle('');
      setDescription('');
      setFile(null);
      fetchImages(); // aggiorna la galleria
    } catch (err) {
      setError('Errore durante il caricamento');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/images/${id}`);
      fetchImages(); // aggiorna la galleria
    } catch (err) {
      console.error('Errore eliminazione immagine:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload immagine</h2>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input type="file" onChange={handleFileChange} className={styles.input} />
        <input
          type="text"
          placeholder="Titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Descrizione"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={styles.button}
        >
          Carica
        </button>
      </form>

      {loading && <p>Caricamento in corso...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3 className={styles.heading}>Galleria</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {images.map((img) => (
          <div key={img.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', backgroundColor: 'white' }}>
            <img
              src={img.imageUrl}
              alt={img.title}
              style={{ maxWidth: '200px', display: 'block', marginBottom: '0.5rem' }}
            />
            <h4>{img.title}</h4>
            <p>{img.description}</p>
            <button
              onClick={() => handleDelete(img.id)}
              className={styles.button}
              style={{ backgroundColor: '#f44336' }}
            >
              Elimina
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}




