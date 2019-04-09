const express = require('express');

const routes = express.Router();

routes.get('/teste', (req, res) => {
    return res.send('Hello mundo33ss')
});


module.exports = routes;