const Pizzaria = require('../model/pizzaria');

async function autenticar(req, res) {
    const pizzaria = await Pizzaria.findOne({
        where: {
            email: req.body.email,
            senha: req.body.senha
        }
    });

    if (pizzaria !== null) {
        req.session.autorizado = true;
        req.session.pizzaria = pizzaria;
        res.redirect('/home');
    } else {
        let erro_autenticacao = true;
        res.render('login_pizzaria.html', { erro_autenticacao });
    }
}

function verificarAutenticacao(req, res, next) {
    if (req.session.autorizado) {
        console.log("Pizzaria autorizada");
        next();
    } else {
        console.log("Pizzaria NÃO autorizada");
        res.redirect('/');
    }
}

function sair(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    autenticar,
    verificarAutenticacao,
    sair
};
