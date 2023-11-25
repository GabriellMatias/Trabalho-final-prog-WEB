const Usuario = require('../model/usuario');

function cadastrarUsuario(req, res) {
    let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento
    }
    
    Usuario.create(usuario).then(()=>{
        let sucesso = true;
        res.render("index.html", {sucesso});
    }).catch((err)=>{
        console.log(err);
        let erro = true;
        res.render("index.html", {erro});
    });

}
function editarUsuarioView(req, res){
    res.render('editarUsuario.html');
}

async function editarUsuario(req, res) {
    const userId = req.session.usuario.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const novaSenha = req.body.senha;

    try {
        // Encontre o usuário pelo ID
        const usuario = await Usuario.findByPk(userId);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        // Atualize os dados do usuário
        usuario.nome = nome;
        usuario.email = email;
        if (novaSenha) {
            usuario.senha = novaSenha;
        }

        // Salve as alterações no banco de dados
        await usuario.save();

        res.render('home.html');
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao editar usuário.' });
    }
}

function listarUsuarios(req, res) {
    Usuario.findAll().then((usuarios)=>{
        res.json(usuarios);
    }).catch((err)=>{
        res.json(err);
    });
}
function cadastroUsuarioView(req, res){
    res.render("cadastro.html");
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    cadastroUsuarioView,
    editarUsuarioView,
    editarUsuario
}