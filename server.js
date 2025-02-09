// Budget API

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use('/', express.static('public'));



app.get('/hello', (req, res) => {
    res.send("hello World");
});

app.get('/budget', (req, res) => {
    fs.readFile('Readdata.json', 'utf8', (err, data) => {
            // Parse the JSON data
            const budgetData = JSON.parse(data);
            res.json(budgetData);
    });
});


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});