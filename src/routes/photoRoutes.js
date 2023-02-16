import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import photoController from '../controllers/PhotoController';

const router = new Router();
// Recebendo 1 arquivo
router.post('/', loginRequired, photoController.store);

export default router;
