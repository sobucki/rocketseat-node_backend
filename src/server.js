const express = require('express');

const app = express();

app.use(express.json());//registra utilizacao de json
app.use(express.urlencoded({ extended: true}));// autoriza o envio de arquivos

app.use(require('./routes'));//importa nossas rotas


app.listen(3333);