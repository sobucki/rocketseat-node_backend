const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistacksobucki@cluster0-mz88h.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    });

app.use(express.json());//registra utilizacao de json
app.use(express.urlencoded({ extended: true }));// autoriza o envio de arquivos

app.use(require('./routes'));//importa nossas rotas

console.log('tes31te');
app.listen(3333);