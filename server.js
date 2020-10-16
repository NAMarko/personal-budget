const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use('/', express.static('public'));

const fs = require('fs');
let rawdata = fs.readFileSync('budget.json');
let budget = JSON.parse(rawdata);

app.get('/hello', (req, res) => {
    res.send('Hello world!');
});

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:3000');
});