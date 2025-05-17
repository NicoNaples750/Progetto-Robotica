import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TemperaturePreview() {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    axios.get('/api/temperature')
      .then((res) => {
        console.log('Risposta temperatura:', res.data);
        setTemp(res.data);
      })
      .catch((err) => console.error('Errore temperatura', err));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Temperatura attuale</h2>
      {temp ? (
        <p className="text-2xl text-blue-600">{temp.temperature}°C</p>
      ) : (
        <p className="text-gray-400">Caricamento...</p>
      )}
    </div>
  );
}
