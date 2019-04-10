const mongoose = require('mongoose');

//definicao do schema da "tabela" na base
const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    }
}, {
    timestamps: true //ira gravar as datas de edicao e criacao dos registros
});

//exportacao do model
module.exports = mongoose.model("File", File);