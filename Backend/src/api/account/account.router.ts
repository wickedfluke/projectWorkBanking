import express from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';
import { me } from './account.controller';
import { list } from './account.controller';

const router = express.Router();

router.use(isAuthenticated)
router.get('/', list)
router.get('/me', me);

export default router;