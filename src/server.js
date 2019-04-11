const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//permite que todos acessem os recursos da aplicacao
app.use(cors());

//para ouvir tanto requisicoes http como websocket
const server = require('http').Server(app);
const io = require('socket.io')(server);

//cria uma rota de 'connection' no socket
io.on("connection", socket => {
    //para esse socket aberto ele cria uma sala chamada 'connectRoom' isolando atraves do ID da Box
    socket.on("connectRoom", box => {
        //vincula o socket especifico conforme o Box passado
        socket.join(box);
    })
    console.log("ok");
})

//conexao forncido pelo MongoDB
mongoose.connect('mongodb+srv://omnistack:omnistacksobucki@cluster0-mz88h.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    });

//cria um middleware padrao para anexar o 'io' aberto a requisicao feita
//chama o next() para continuar com as operacoes
app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(express.json());//registra utilizacao de json
app.use(express.urlencoded({ extended: true }));// autoriza o envio de arquivos

//redireciona para a pasta tmp toda requisicao /files
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

//importa nossas rotas
app.use(require('./routes'));


//busca das variaveis de ambiente do nodejs a porta
app.listen(process.env.PORT || 3333);