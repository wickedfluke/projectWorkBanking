import express from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';
import { me, password } from './account.controller';
import { list } from './account.controller';

const router = express.Router();

router.use(isAuthenticated)
router.get('/', list)
router.get('/me', me);
router.post('/password', password);

export default router;