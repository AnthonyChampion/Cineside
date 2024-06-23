const express = require("express");

require('dotenv').config();

const cors = require("cors");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Démarrage du serveur sur le port spécifié (ici 3000)
const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});