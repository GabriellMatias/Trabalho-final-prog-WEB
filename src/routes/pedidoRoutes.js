const express = require('express');
const router = express.Router();

const pedidoController = require('../controller/pedidoController');
const autenticacaoController = require('../controller/autenticacaoController');
const autenticacaoPizzariaController = require('../controller/autenticacaoPizzariaController');

router.get('/', pedidoController.indexView);
router.get('/home', autenticacaoController.verificarAutenticacao, pedidoController.homeView);
router.post('/fazer_pedido', autenticacaoController.verificarAutenticacao, pedidoController.fazerPedido)
router.delete('/excluirPedido/:id', autenticacaoController.verificarAutenticacao, pedidoController.excluirPedido)
router.get('/editarPedido/:id', autenticacaoController.verificarAutenticacao, pedidoController.editarPedido)
router.get('/listar_pedidos',  autenticacaoController.verificarAutenticacao, pedidoController.pedidosView)
router.post('/salvarEdicaoPedido',  autenticacaoController.verificarAutenticacao, pedidoController.salvarEdicaoPedido)
module.exports = router;