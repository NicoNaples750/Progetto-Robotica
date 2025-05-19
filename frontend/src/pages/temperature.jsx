import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../src/styles/temperature.module.css';

export default function TemperaturePage() {
  const [data, setData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch('/api/temperature');
        const result = await response.json();
        const newTemp = result.temperature;
        setCurrentTemp(newTemp);

        const newEntry = {
          time: new Date().toLocaleTimeString(),
          temperature: newTemp
        };
        setData((prev) => [...prev.slice(-19), newEntry]);
      } catch (error) {
        console.error('Errore nel recupero della temperatura:', error);
      }
    };

    fetchTemperature();
    const interval = setInterval(fetchTemperature, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = () => {
    if (currentTemp === null) return '';
    return currentTemp > 70 ? 'Allarme' : 'Normale';
  };

  const getStatusClass = () => {
    if (currentTemp === null) return '';
    return currentTemp > 70 ? styles.alert : styles.normal;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Monitoraggio Temperatura</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        {currentTemp !== null && (
          <div className={`${styles.status} ${getStatusClass()}`}>
            Stato: {getStatus()} - Temperatura: {currentTemp}°C
          </div>
        )}
      </div>
    </div>
  );
}






