const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Servir les fichiers statiques
app.use(express.static(__dirname));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour les réalisations
app.get('/realisations.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'realisations.html'));
});

// Route pour la veille technologique
app.get('/veille.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'veille.html'));
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio HTML accessible sur http://localhost:${PORT}`);
});