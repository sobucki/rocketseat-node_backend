const multer = require('multer');
const path = require('path');//importa o path para facilitar o acesso a arquivos
const crypto = require('crypto');//lib para gerar o hash do arquivo

//define o objeto que ira ser exportado
module.exports = {
    //__dirname retorna o caminho absoluto do arquivo, apartir da pasta config
    // os ".." funcionam para voltar de pasta
    //define a pasta tmp como destino (necessario criar esta pasta na raiz do projeto)
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    //informa que sera utilizado o armazenamento em disco
    storage: multer.diskStorage({
        //retorna uma funcao com o mesmo caminho de destino
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },
        //funcao para evitar sobrescrita do arquivo enviado
        //atraves da criacao de um hash unico
        filename: (req, file, cb) => {
            //cria o hash de 16 bits
            crypto.randomBytes(16, (err, hash) => {
                //caso de erro retorna ao callback o erro
                if (err) cb(err);

                //cria a chava unica do arquivo utilizando templatestring
                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key)

            })
        }
    })
}