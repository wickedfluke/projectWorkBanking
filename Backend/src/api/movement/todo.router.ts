import express from 'express';
import { list, createTodo, toggleCheckStatus, assignToTodo } from './todo.controller';
import { CreateTodoDTO } from './todo.dto';
import { validate } from '../../utils/validation-middleware';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';
import { checkTodoOwnership } from '../../utils/ownership-middleware';

const router = express.Router();
router.use(isAuthenticated)
router.get('/', list);
router.post('/', validate(CreateTodoDTO), createTodo);
router.post('/:id/assign', assignToTodo)
router.patch('/:id/check', checkTodoOwnership, toggleCheckStatus);
router.patch('/:id/uncheck', checkTodoOwnership, toggleCheckStatus);

export default router;