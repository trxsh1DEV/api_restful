"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// ROTA PARA CRIAR/ALTERAR E DELETAR USUÁRIOS

router.get('/', _UserController2.default.index); // não existiria em uma aplicação real
router.get('/:id', _UserController2.default.show);// não existiria em uma aplicação real

// Não colocamos ID aqui, porque se n um usuário poderia alterar ou excluir outros usuários, oq n faz sentido
// Desse jeito q está os usuários podem apenas alterar e excluir o seu próprio usuário baseado no id do seu token
router.post('/', _UserController2.default.store);
router.put('/', _loginRequired2.default, _UserController2.default.update);
router.delete('/', _loginRequired2.default, _UserController2.default.delete);
// router.delete('/', userController.delete); Delete all

exports. default = router;

/*
index -> lista todos usuários -> GET
store/create -> cria novo usuário -> POST
delete -> deleta usuário -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuário -> PUT / PATCH
*/
