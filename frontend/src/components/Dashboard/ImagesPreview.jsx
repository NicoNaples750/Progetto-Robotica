import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Dashboard.module.css';


const API_URL = '/api';

export default function ImagesPreview() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/images`)
      .then(res => {
        console.log('Immagini ricevute:', res.data);
        setImages(res.data.slice(0, 3));
      })
      .catch(err => console.error('Errore nel caricamento delle immagini', err));
  }, []);

  return (
    <div className={styles.imagesWidget}>
      <h2>Ultime immagini</h2>
      <div className={styles.imagesRow}>
        {images.length > 0 ? images.map(img => (
          <img
            key={img.id || img._id}
            src={img.imageUrl || img.url}
            alt={img.description || "Immagine"}
          />
        )) : <p>⚠️ Nessuna immagine trovata</p>}
      </div>
    </div>
  );
}


