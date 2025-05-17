import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function SkillsPreview() {
  const [skills, setSkills] = useState([]);
  const router = useRouter();

  const fetchSkills = () => {
    axios.get(`${API_URL}/skills`)
      .then((res) => setSkills(res.data.slice(0, 3)))
      .catch((err) => console.error('Errore nel caricamento delle skills', err));
  };

  
  // Prima chiamata al caricamento iniziale
  useEffect(() => {
    fetchSkills();
  }, []);

  // Ricarica quando si torna sulla Dashboard
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url.includes('/dashboard')) {
        fetchSkills();
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Skills recenti</h2>
      <ul className="list-disc list-inside text-gray-700">
        {skills.length > 0 ? skills.map((skill) => (
          <li key={skill._id}>{skill.name}</li>
        )) : <li>⚠️ Nessuna skill trovata</li>}
      </ul>
    </div>
  );
}
