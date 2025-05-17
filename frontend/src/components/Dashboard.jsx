import React from "react";
import styles from "../styles/Dashboard.module.css";
import styles from "../styles/ImagesPreview.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Altri contenuti */}
      <h1>Benvenuto nel tuo progetto!</h1>
      <p>Qui puoi gestire tutte le tue missioni e altro ancora.</p>
      {/* Link per le pagine */}
    </div>
  );
}

