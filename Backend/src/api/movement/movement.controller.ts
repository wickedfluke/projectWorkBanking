import { Movement } from './movement.entity';
import { NextFunction, Request, Response } from 'express';
import { MovementService } from './movement.service';
import { MovementModel } from './movement.model';
import { Parser } from 'json2csv';

const movementService = new MovementService(MovementModel);







export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const includeCompleted = req.query.includeCompleted == 'true';
        const userId = req.user!.id;
        const items = await movementService.listByUser(includeCompleted, userId!);
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

export const exportMovementsCSV1 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id!;
        const { number } = req.body;
        
        const result = await movementService.listMovementsWithBalance(number, userId);
        const movements = result.movements;
        
        const fields = ['data', 'importo', 'nomeCategoria'];
        const opts = { fields };
        
        const parser = new Parser(opts);
        const csv = parser.parse(movements);
        res.header('Content-Type', 'text/csv');
        res.attachment('movements.csv');
        
        return res.send(csv);
    } catch (err) {
        next(err);
    }
};

export const exportMovementsCSV2 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id!;
        const categoryId = req.params.categoryId;
        const { number } = req.body;
        
        const result = await movementService.listMovementsByCategory(number, categoryId, userId);
        const movements = result.movements;
        
        const fields = ['data', 'importo', 'nomeCategoria'];
        const opts = { fields };
        
        const parser = new Parser(opts);
        const csv = parser.parse(movements);
        res.header('Content-Type', 'text/csv');
        res.attachment('movements.csv');
        
        return res.send(csv);
    } catch (err) {
        next(err);
    }
};

export const exportMovementsCSV3 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id!;
        const { number } = req.body;
        const { startDate, endDate } = req.query;
        
        if (typeof startDate !== 'string' || typeof endDate !== 'string') {
            return res.status(400).json({ error: 'Invalid date range' });
        }

        const result = await movementService.listMovementsByDateRange(number, startDate, endDate, userId);
        const movements = result.movements;
        
        const fields = ['data', 'importo', 'nomeCategoria'];
        const opts = { fields };
        
        const parser = new Parser(opts);
        const csv = parser.parse(movements);
        res.header('Content-Type', 'text/csv');
        res.attachment('movements.csv');
        
        return res.send(csv);
    } catch (err) {
        next(err);
    }
};
