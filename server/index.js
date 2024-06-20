require("dotenv").config();

const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.meta.env.PORT;

// app.use(express.static(path.join(__dirname, '../build')));

// app.get('/api', (req, res) => {
//     res.json({ message: "Hello from the server!" });
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});