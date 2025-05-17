import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ReportList.module.css';

export default function ReportPage() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    missionId: '',
    status: '',
    description: ''
  });

  useEffect(() => {
    axios.get('/api/report').then((res) => {
      setReports(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const aggiungiReport = async () => {
    if (!form.missionId || !form.status) {
      alert('missionId e status sono obbligatori');
      return;
    }
    try {
      const res = await axios.post('/api/report', form);
      setReports([...reports, res.data]);
      setForm({ missionId: '', status: '', description: '' });
    } catch (error) {
      alert('Errore nell\'aggiunta del report');
    }
  };

  const eliminaReport = async (id) => {
    try {
      await axios.delete(`/api/report/${id}`);
      setReports(reports.filter((r) => r.id !== id));
    } catch (error) {
      alert('Errore nell\'eliminazione del report');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Report Missioni</h2>

      <div className={styles.form}>
        <input
          name="missionId"
          value={form.missionId}
          onChange={handleChange}
          placeholder="ID Missione"
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">Seleziona status</option>
          <option value="completata">Completata</option>
          <option value="fallita">Fallita</option>
          <option value="in corso">In corso</option>
        </select>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descrizione"
        />
        <button onClick={aggiungiReport}>Aggiungi</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID Missione</th>
            <th>Status</th>
            <th>Descrizione</th>
            <th>Data Creazione</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.missionId}</td>
              <td>{report.status}</td>
              <td>{report.description}</td>
              <td>{new Date(report.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => eliminaReport(report.id)}>Elimina</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
