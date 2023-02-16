import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// ROTA PARA CRIAR/ALTERAR E DELETAR USUÁRIOS

router.get('/', userController.index); // não existiria em uma aplicação real
router.get('/:id', userController.show);// não existiria em uma aplicação real

// Não colocamos ID aqui, porque se n um usuário poderia alterar ou excluir outros usuários, oq n faz sentido
// Desse jeito q está os usuários podem apenas alterar e excluir o seu próprio usuário baseado no id do seu token
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);
// router.delete('/', userController.delete); Delete all

export default router;

/*
index -> lista todos usuários -> GET
store/create -> cria novo usuário -> POST
delete -> deleta usuário -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuário -> PUT / PATCH
*/
