import UserInfo from '../components/Dashboard/UserInfo';
import SkillsPreview from '../components/Dashboard/SkillsPreview';
import MissionsPreview from '../components/Dashboard/MissionsPreview';
import ImagesPreview from '../components/Dashboard/ImagesPreview';
import TemperaturePreview from '../components/Dashboard/TemperaturePreview';
import styles from '../styles/Dashboard.module.css';
//import styles from '../src/styles/ImagesPreview.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Dashboard Tecnico</h1>

      <div className={styles.grid}>
        <div className={styles.widget}><UserInfo /></div>
        <div className={styles.widget}><TemperaturePreview /></div>
        <div className={styles.widget}><SkillsPreview /></div>
        <div className={styles.widget}><MissionsPreview /></div>
        <div className={`${styles.widget} ${styles.imagesWidget} ${styles.fullWidth}`}>
          <ImagesPreview />
        </div>
      </div>
    </div>
  );
}
