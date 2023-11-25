const express = require('express');
const router = express.Router();

const autenticacaoController = require('../controller/autenticacaoController');
const autenticacaoPizzariaController = require('../controller/autenticacaoPizzariaController');

router.post('/autenticar', autenticacaoController.autenticar);
router.post('/autenticar_view', autenticacaoController.indexView);
router.get('/sair', autenticacaoController.sair);

router.post('/autenticar_pizzaria', autenticacaoPizzariaController.autenticar);
router.get('/sair_pizzaria', autenticacaoPizzariaController.sair);

module.exports = router;