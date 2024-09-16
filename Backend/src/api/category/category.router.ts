import express from 'express';
import { list, createCategory } from './category.controller';

const router = express.Router();
router.get('/', list);
router.post('/', createCategory);

export default router;