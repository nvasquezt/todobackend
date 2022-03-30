const express = require('express');
const morgan = require('morgan');

function configureExpress(app) {
    app.use(morgan('dev'));
    app.use(express.json());
}

module.exports = configureExpress;
