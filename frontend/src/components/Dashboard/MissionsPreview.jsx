import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MissionsPreview() {
  const [missioni, setMissioni] = useState([]);

  useEffect(() => {
    const fetchMissioni = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/mission');
        setMissioni(res.data.slice(0, 3)); // prime 3 missioni più recenti
      } catch (err) {
        console.error('Errore nel recupero missioni:', err);
      }
    };

    fetchMissioni();
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Ultime Missioni</h2>
      {missioni.length === 0 ? (
        <p>Nessuna missione trovata.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {missioni.map((m) => (
            <li key={m.id}>
              <strong>{m.nome}</strong> — {m.stato} —{' '}
              {new Date(m.data_creazione).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


