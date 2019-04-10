const Box = require('../models/Box');

//definicao da classe do controller
class BoxController {
    async store(req, res) {// recebe uma requisicao e devolve uma resposta
        
        //{ title: req.body.title }
        const box = await Box.create(req.body);// chama o create do mongoose passando o paramentro

        return res.json(box);
    }

    //funcao para retornar um box e seus Files relacionados
    async show(req, res) {
        //utilizando o populate forca a busca dos Files associados ao Box
        //Para ordenar e utilizado o parametro options>sort>createdAt -1 (para vir os mais recentes primeiro)
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1}}
        });

        return res.json(box)
    }
}

//exporta o modulo
module.exports = new BoxController();