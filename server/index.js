require("dotenv").config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api', (req, res) => {
    res.json({ message: "Hello from the server!" });
});

// Route pour gérer toutes les autres requêtes et renvoyer l'application React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});