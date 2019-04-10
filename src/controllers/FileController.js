const File = require('../models/File');
const Box = require('../models/Box');


class FileController {
    async store(req, res) {
        //atraves do ID passado por parametro buscar o Box referente
        const box = await Box.findById(req.params.id);

        //realiza a criacao do registro de um File no banco MongoDB
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        //associa o Box buscado com o File criado
        box.files.push(file);
        //chama o save do Box
        await box.save();

        return res.json(file);
    }
}

//exporta o modulo
module.exports = new FileController();