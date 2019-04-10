const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

//importa os controllers
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');


//direciona para a nova url a requisao
//Chamando a funcao Store do controller
//utiliza o POST para enviar a requisicao de criacao de registros
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);


routes.post(
    '/boxes/:id/files',
    //para passar somente um arquivo
    //'file' como parametro pois ele ira ler este paramatro
    multer(multerConfig).single('file'),
    FileController.store);


module.exports = routes;