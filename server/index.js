const database = require('./database/model/user.model');
const express = require('express');

const app = express();
app.use(express.json());

database.connect();
database.newEntry([[
    5,
    'My Second Entry',
    'This is my second entry',
    'A test to verify my sql queries',
    '20220626',
    '20220626',
    'BLOG'
]]);

database.getByType('PROJECT');

app.listen(8000, () => {
    console.log('Listening');
});

app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});