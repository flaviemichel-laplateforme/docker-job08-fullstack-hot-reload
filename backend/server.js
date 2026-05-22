require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());

const PORT = 3000;

// Configuration de la connexion (les valeurs viennent du docker-compose qui lit le .env)
const db = mysql.createConnection({
    host: 'db', // Le nom du service dans docker-compose
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Route principale
app.get('/', (req, res) => {
    res.json({ message: "API Backend en ligne ! (Modifie ce texte pour tester le Hot Reload)" });
});

// Route de test BDD
app.get('/db-test', (req, res) => {
    db.ping((err) => {
        if (err) return res.status(500).json({ error: "MySQL inaccessible" });
        res.json({ success: "Connecté à MySQL avec succès !" });
    });
});

app.listen(PORT, () => {
    console.log(`Backend connecté sur le port ${PORT}`);
});