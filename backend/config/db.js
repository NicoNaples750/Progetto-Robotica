const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
 
    console.log(`✅ MongoDB Connesso: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Errore connessione MongoDB: ${error.message}`);
    process.exit(1); // Chiude il server in caso di errore
  }
};

// 🔥 Esporta correttamente la funzione!
module.exports = connectDB;

