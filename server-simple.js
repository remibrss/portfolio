const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour les réalisations
app.get('/realisations', (req, res) => {
    res.sendFile(path.join(__dirname, 'realisations.html'));
});

// Route pour la veille
app.get('/veille', (req, res) => {
    res.sendFile(path.join(__dirname, 'veille.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Dylan Chau accessible sur http://localhost:${PORT}`);
});