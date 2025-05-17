// backend/scripts/seedUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Assicurati che il path sia corretto
import dotenv from 'dotenv';
dotenv.config();

const createUser = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash('mario123', 10);

  const user = new User({
    username: 'Mario',
    password: hashedPassword,
    role: 'tecnico'
  });

  await user.save();
  console.log('Utente Mario creato!');
  mongoose.disconnect();
};

createUser().catch(err => {
  console.error('Errore nella creazione utente:', err);
  mongoose.disconnect();
});
