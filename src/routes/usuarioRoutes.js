const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');
const pizzariaController = require('../controller/pizzariaController');

router.post('/cadastrar_usuario', usuarioController.cadastrarUsuario);
router.get('/cadastrar_usuario_view', usuarioController.cadastroUsuarioView);

router.get('/api/usuarios', usuarioController.listarUsuarios);

router.get('/editarUsuario', usuarioController.editarUsuarioView);
router.post('/editarUsuario', usuarioController.editarUsuario);

router.post('/cadastrar_pizzaria', pizzariaController.cadastrarPizzaria);
router.get('/api/pizzarias', pizzariaController.listarPizzarias);

module.exports = router;