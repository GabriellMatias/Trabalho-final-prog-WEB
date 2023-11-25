const Pedido = require('../model/pedido');

function indexView(req, res) {
    res.render('index.html');
}
function homeView(req, res) {
    const usuario = req.session.usuario
    res.render('home.html', { usuario  });
}

function pedidosView(req, res) {

    Pedido.findAll({
        where: {
            id_cliente: req.session.usuario.id,
            status: 'ativo'
        }
    }).then((pedidos) => {
        const usuario = req.session.usuario;
        res.render('pedidos.html', { pedidos, usuario });
    }).catch((erro_recupera_pedidos) => {
        res.render('pedidos.html', { erro_recupera_pedidos });
    });

}
async function editarPedido(req, res) {
    try {
        const pedidoId = req.params.id;
        
        // Use findOne em vez de findAll se você espera apenas um pedido com o ID fornecido
        const pedido = await Pedido.findOne({
            where: {
                id: pedidoId,
            }
        });

        if (!pedido) {
            return res.status(404).send('Pedido não encontrado.');
        }

        // Envie os detalhes do pedido para a página de edição
        res.render('editarPedido.html', { pedido });
    } catch (error) {
        console.error('Erro ao recuperar detalhes do pedido:', error);
        res.status(500).send('Erro ao recuperar detalhes do pedido.');
    }
}

function excluirPedido(req, res){
    const pedidoId = req.params.id;

    // Lógica para excluir o pedido com o ID fornecido
    Pedido.destroy({ where: { id: pedidoId } })
        .then(() => {
            res.send(`Pedido ${pedidoId} excluído com sucesso.`);
        })
        .catch((err) => {
            console.error('Erro ao excluir pedido:', err);
            res.status(500).send('Erro ao excluir pedido.');
        });
}

async function salvarEdicaoPedido(req, res) {
    try {
        const pedidoId = req.body.pedidoId;

        const updatedPedido = await Pedido.update(
            {
                sabor: req.body.sabor,
                acompanhamentos: req.body.acompanhamentos,
                observacoes: req.body.observacoes,
            },
            { 
                where: { id: pedidoId },
                returning: true, // Retorna o objeto atualizado
            }
        );

        if (!updatedPedido) {
            return res.status(404).send('Pedido não encontrado.');
        }

        console.log(updatedPedido);

        res.redirect('/listar_pedidos');
    } catch (error) {
        console.error('Erro ao salvar edições do pedido:', error);
        res.status(500).send('Erro ao salvar edições do pedido.');
    }
}

function fazerPedido(req, res) {
    let pedido = {
        sabor: req.body.sabor,
        id_cliente: req.session.usuario.id,
        acompanhamentos: req.body.acompanhamentos,
        observacoes: req.body.observacoes,
        status: 'ativo'
    }

    Pedido.create(pedido).then(() => {
        res.redirect('/listar_pedidos');
    }).catch((err) => {
        console.log(err);
        let erro_fazer_pedido = true;
        res.render("pedidos.html", { erro_fazer_pedido });
    });

}

module.exports = {
    indexView,
    pedidosView,
    fazerPedido, 
    homeView,
    excluirPedido,
    editarPedido, 
    salvarEdicaoPedido
};
