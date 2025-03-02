

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(express.static('public')); 


app.use('/Readdata.json', express.static(path.join(__dirname, 'Readdata.json')));

app.get('/budget', (req, res) => {
    fs.readFile(path.join(__dirname, 'Readdata.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading Readdata.json:", err);
            return res.status(500).json({ error: "Failed to load budget data" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});

