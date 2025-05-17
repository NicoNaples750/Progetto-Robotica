// pages/index.jsx
import Link from 'next/link';
import styles from '../src/styles/Home.module.css';
import { useAuth } from '../src/context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Benvenuto nel progetto SymAIbot!</h1>
      <p className={styles.description}>Seleziona una delle opzioni qui sotto per iniziare:</p>
      
      <ul className={styles.linkList}>
        <li><Link href="/dashboard" className={styles.link}>Dashboard</Link></li>
        <li><Link href="/missioni" className={styles.link}>Missioni</Link></li>
        <li><Link href="/skills" className={styles.link}>Skills</Link></li>
        <li><Link href="/temperature" className={styles.link}>Temperature</Link></li>
        <li><Link href="/errori" className={styles.link}>Errori</Link></li>
        <li><Link href="/report" className={styles.link}>Report</Link></li>
        <li><Link href="/immagini" className={styles.link}>Immagini</Link></li>

        {!user && (
          <li><Link href="/login" className={styles.link}>Login</Link></li>
        )}

        {user && (
          <>
            <li className={styles.link}>👤 {user.username} ({user.role})</li>
            <li>
              <button onClick={logout} className={styles.link} style={{ border: "none", background: "none", cursor: "pointer" }}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}



