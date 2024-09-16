import { NextFunction, Request, Response } from 'express';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { validateTodo } from './todo.middleware';
import { TodoModel } from './todo.model';

const todoService = new TodoService(TodoModel);

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const includeCompleted = req.query.includeCompleted == 'true';
        const userId = req.user!.id;
        const items = await todoService.listByUser(includeCompleted, userId!);
        res.json(items);
    } catch (err) {
        next(err);
    }
}

export const createTodo = [
    validateTodo,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user!;
            const newTodo: Todo = req.body;
            const saved = await todoService.create(newTodo, user.id!);
            return res.status(201).json(saved);
        } catch (err) {
            next(err);
        }
    }
];

export const toggleCheckStatus = [
    validateTodo,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            let updated;
            if (req.path.endsWith('/check')) {
                updated = await todoService.markAsChecked(id);
            } else if (req.path.endsWith('/uncheck')) {
                updated = await todoService.markAsNotChecked(id);
            } else {
                return res.status(400).json({ error: 'Invalid path' });
            }
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }
];

export const assignToTodo = [
    validateTodo,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todoId = req.params.id;
            const assignedUserId = req.body.userId;

            const assignedTodo = await todoService.assignUserToTodo(todoId, assignedUserId);
            return res.status(200).json(assignedTodo);
        } catch (error) {
            next(error);
        }
    }
];
