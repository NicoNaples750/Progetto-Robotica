import UserInfo from '../src/components/Dashboard/UserInfo';
import SkillsPreview from '../src/components/Dashboard/SkillsPreview';
import MissionsPreview from '../src/components/Dashboard/MissionsPreview';
import ImagesPreview from '../src/components/Dashboard/ImagesPreview';
import TemperaturePreview from '../src/components/Dashboard/TemperaturePreview';
import styles from '../src/styles/Dashboard.module.css';
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
