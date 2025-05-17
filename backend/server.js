const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const skillRoutes = require("./routes/skillRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const missionRoutes = require('./routes/missionRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Carica variabili d'ambiente
dotenv.config();

// Connessione al database
connectDB()
  .then(() => console.log("✅ Connessione al database riuscita"))
  .catch((err) => {
    console.error("❌ ERRORE durante la connessione al database:", err);
    process.exit(1); // Termina il processo in caso di errore
  });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotte API
app.use("/api/auth", authRoutes); // Rotta per l'autenticazione (login/registrazione)
app.use("/api/skills", skillRoutes); // Rotta per le skill
app.use("/api/mission", require("./routes/missionRoutes"));
app.use("/api/report", require("./routes/reportRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use("/api/timeline", require("./routes/logRoutes"));
app.use("/api/admin", adminRoutes);

// Test di connessione al database
console.log("MONGO_URI:", process.env.MONGO_URI);
if (!process.env.MONGO_URI) {
  console.error("❌ ERRORE: MONGO_URI non definito! Controlla il file .env.");
  process.exit(1);
}

// Avvio server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server avviato sulla porta ${PORT}`));


