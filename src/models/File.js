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
        //ira gravar as datas de edicao e criacao dos registros
        timestamps: true,
        //toObject e toJSON incia se ira chamar as variais virtuais no parseamento
        toObject: { virtuals: true },
        toJSON: { virtuals: true }

    });
//Funcao que monta o caminho acessivel para o front atraves de uma variavel virtual
File.virtual('url').get(function () {
    const url = process.env.URL || 'http://localhost:3333';

    return `${url}/files/${encodeURIComponent(this.path)}`
});

//exportacao do model
module.exports = mongoose.model("File", File);