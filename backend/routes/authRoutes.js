const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController"); // Assicurati che il controller contenga entrambe le funzioni

// Verifica che login e register siano funzioni
console.log(typeof login);  // Questo dovrebbe stampare 'function'

// Rotta per il login
router.post("/login", login);

// Rotta per la registrazione
router.post("/register", register);

module.exports = router;


