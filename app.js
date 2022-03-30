'use strict'
require('dotenv').config()

const express = require('express');

const configureExpress = require('./config/express');
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();

connectDB();
configureExpress(app);
routes(app);

const port= process.env.PORT || 3031;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
