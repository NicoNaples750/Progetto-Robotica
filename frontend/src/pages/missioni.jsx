import styles from '../styles/Missioni.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Missioni() {
  const [missions, setMissions] = useState([]);
  const [newMission, setNewMission] = useState({
    nome: '',
    descrizione: '',
    stato: 'in_attesa',
    priorita: 'Media',
  });
  const [errore, setErrore] = useState(null);
  const [editMission, setEditMission] = useState(null);

  const fetchMissions = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/mission');
    console.log("Missions ricevute dal backend:", JSON.stringify(res.data, null, 2));
    setMissions(res.data);
  } catch (err) {
    setErrore('Errore nel caricamento delle missioni');
  }
};


  useEffect(() => {
    fetchMissions();
  }, []);

  const handleChange = (e) => {
    setNewMission({ ...newMission, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editMission) {
      // Uso editMission._id e non mission.id (mission non è definito qui)
      console.log("editMission._id:", editMission._id); // DEBUG
      const res = await axios.put(`http://localhost:5000/api/mission/${editMission._id}`, newMission, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMissions(missions.map((m) => (m._id === res.data._id ? res.data : m)));
      setEditMission(null);
    } else {
      const res = await axios.post('http://localhost:5000/api/mission', newMission, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMissions([res.data, ...missions]);
    }
    setNewMission({
      nome: '',
      descrizione: '',
      stato: 'in_attesa',
      priorita: 'Media',
    });
    setErrore(null);
  } catch (err) {
    setErrore('Errore nella gestione della missione');
    console.error(err.response?.data || err.message);
  }
};

const handleDelete = async (id) => {
  console.log("id da eliminare:", id); // DEBUG
  try {
    // Uso id direttamente nella URL
    await axios.delete(`http://localhost:5000/api/mission/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    // Aggiorno la lista filtrando la missione eliminata
    setMissions(missions.filter((m) => m._id !== id));
    setErrore(null);
  } catch (err) {
    setErrore('Errore nell’eliminazione della missione');
    console.error(err.response?.data || err.message);
  }
};



  const handleEdit = (mission) => {
    console.log("mission passata a handleEdit:", mission); // DEBUG
    setEditMission(mission);
    setNewMission({
      nome: mission.nome,
      descrizione: mission.descrizione,
      stato: mission.stato,
      priorita: mission.priorita,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Gestione Missioni</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="nome"
          placeholder="Nome missione"
          value={newMission.nome}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="descrizione"
          placeholder="Descrizione"
          value={newMission.descrizione}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <select
          name="priorita"
          value={newMission.priorita}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Bassa">Bassa</option>
        </select>
        <button type="submit" className={styles.button}>
          {editMission ? 'Aggiorna' : 'Aggiungi'}
        </button>
        {editMission && (
          <button type="button" className={styles.button} onClick={() => setEditMission(null)}>
            Annulla Modifica
          </button>
        )}
      </form>

      {errore && <p className={styles.error}>{errore}</p>}

      <ul className={styles.missionList}>
        {missions.map((mission) => (
          <li key={mission._id} className={styles.missionItem}>
            <h3>{mission.nome}</h3>
            <p>{mission.descrizione}</p>
            <p><strong>Priorità:</strong> {mission.priorita}</p>

            <button onClick={() => handleDelete(mission._id)} className={`${styles.button} ${styles.delete}`}>
              Elimina
            </button>
            <button onClick={() => handleEdit(mission)} className={`${styles.button} ${styles.edit}`}>
              Modifica
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


