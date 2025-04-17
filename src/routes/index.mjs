import { Router } from 'express';
import usersRouters from './users.mjs';
import productsRouters from './products.mjs';

const router = Router();

router.use(usersRouters);
router.use(productsRouters);

export default router;
