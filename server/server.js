const express = require("express");

require('dotenv').config();

const cors = require("cors");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});