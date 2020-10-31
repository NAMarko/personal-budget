const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const mongoDBClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/budget_db';
const budgetSchemaModel = require('./budget_schema');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static('public'));
app.use(express.json());

//const fs = require('fs');
//let rawdata = fs.readFileSync('budget.json');
//let budget = JSON.parse(rawdata);

app.get('/hello', (req, res) => {
    res.send('Hello world!');
});

app.get('/budget', (req, res) => {
    //res.json(budget);
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to database");
        budgetSchemaModel.find({})
        .then((data) => {
            res.json(data);
            mongoose.connection.close();
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
    console.log(error);
    });
});

app.post('/addBudget', (req, res) => {
    console.log(req.body);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        var newBudget = {
            title: req.body.title,
            budget: req.body.budget,
            color: req.body.color
        };
        console.log("Adding doc");
        budgetSchemaModel.insertMany(newBudget)
        .then((data)=> {
          res.json(data);
          mongoose.connection.close()
          console.log("Closed connection");
        })
        .catch((error) => {
        console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:3000');
});