const database = require('./database/model/content.model');
const express = require('express');

const app = express();
app.use(express.json());

const DatabaseRoutes = require('./database/routes.config');

DatabaseRoutes.routes_config(app);

app.listen(8000, () => {
    console.log('Listening');
});

app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});