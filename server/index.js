const database = require('./common/services/sql.services');
const express = require('express');

const app = express();
app.use(express.json());

database.connect();

app.listen(8000, () => {
    console.log('Listening');
});

app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});