const Pizzaria = require('../model/pizzaria');

function cadastrarPizzaria(req, res) {
    let pizzaria = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        estado: req.body.estado,
        cep: req.body.cep
    }

    Pizzaria.create(pizzaria).then(() => {
        let sucesso = true;
        res.render("login_pizzaria.html", { sucesso });
    }).catch((err) => {
        console.log(err);
        let erro = true;
        res.render("login_pizzaria.html", { erro });
    });
}

function listarPizzarias(req, res) {
    Pizzaria.findAll().then((pizzarias) => {
        res.json(pizzarias);
    }).catch((err) => {
        res.json(err);
    });
}

module.exports = {
    cadastrarPizzaria,
    listarPizzarias
};
