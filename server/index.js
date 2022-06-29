const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const DatabaseRoutes = require('./database/routes.config');

DatabaseRoutes.routes_config(app);

app.listen(8000, () => {
    console.log('Listening');
});