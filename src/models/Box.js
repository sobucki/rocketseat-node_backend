const mongoose = require('mongoose');

//definicao do schema da "tabela" na base
const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    files: [{ 
        type: mongoose.Schema.Types.ObjectId, //relaciona o ID do outro Schema
        ref: 'File'}]
}, {
    timestamps: true //ira gravar as datas de edicao e criacao dos registros
});

//exportacao do model
module.exports = mongoose.model("Box", Box);