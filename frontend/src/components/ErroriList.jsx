import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/ErrorList.module.css';

export default function ErroriList() {
  const [errori, setErrori] = useState([]);

  useEffect(() => {
    axios.get('/api/errori').then((res) => {
      console.log('Errori ricevuti:', res.data);
      setErrori(res.data);
    });
  }, []);

  const aggiornaStato = async (id, nuovoStato) => {
    if (!id) {
      console.error('Id errore non definito');
      return;
    }
    try {
      const res = await axios.put('/api/errori', { id, stato: nuovoStato });
      console.log('Risposta API aggiornamento:', res.data);
      setErrori(errori.map(e => e.id.toString() === id.toString() ? { ...e, stato: nuovoStato } : e));
    } catch (error) {
      console.error('Errore aggiornamento stato:', error);
      alert('Errore nell\'aggiornamento dello stato, riprova.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Gestione Errori</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrizione</th>
            <th>Missione</th>
            <th>Stato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {errori.map((errore) => {
            console.log('Errore:', errore);
            return (
              <tr key={errore.id}>
                <td>{errore.data}</td>
                <td>{errore.descrizione}</td>
                <td>{errore.missione}</td>
                <td>{errore.stato}</td>
                <td>
                  <button
                    onClick={() => aggiornaStato(errore.id, 'Risolto')}
                    className={styles.button}
                  >
                    Segna come risolto
                  </button>
                  <button
                    onClick={() => alert("Funzione pianifica in sviluppo")}
                    className={styles.button}
                  >
                    Pianifica
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
