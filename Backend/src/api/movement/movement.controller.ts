import { NextFunction, Request, Response } from 'express';
import { movementService } from './movement.service';
import { Parser } from 'json2csv';
import { logService } from '../log/log.service';

export async function listMovementsWithBalanceController(req: Request, res: Response) {
    const { number } = req.query;
    const userId = req.params.userId;

    try {
        const movements = await movementService.listMovementsWithBalance(Number(number), userId);
        res.json(movements);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function listMovementsByCategoryController(req: Request, res: Response) {
    const { number, categoryId } = req.query;
    const userId = req.params.userId;

    try {
        const movements = await movementService.listMovementsByCategory(Number(number), categoryId as string, userId);
        res.json(movements);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function listMovementsByDateRangeController(req: Request, res: Response) {
    const { number, startDate, endDate } = req.query;
    const userId = req.params.userId;

    try {
        const movements = await movementService.listMovementsByDateRange(
            Number(number),
            startDate as string,
            endDate as string,
            userId
        );
        res.json(movements);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function createPhoneMovementController(req: Request, res: Response, next: NextFunction) {
    const { phoneNumber, operator, rechargeAmount } = req.body;
    const userId = req.params.userId;

    try {
        await movementService.createPhoneMovement(userId, phoneNumber, operator, rechargeAmount);
        
        await logService.createLog(req, 'Ricarica telefonica', true);

        res.status(201).json({ message: 'Ricarica telefonica creata con successo' });
    } catch (error) {
        await logService.createLog(req, 'Ricarica telefonica', false);

        res.status(500).json({ error: (error as Error).message });
    }
}

export async function createTransferMovementController(req: Request, res: Response, next: NextFunction) {
    const { receiverIban, transferAmount, description } = req.body;
    const userId = req.params.userId;

    try {
        await movementService.createTransferMovement(userId, receiverIban, transferAmount, description);
        
        await logService.createLog(req, 'Operazione Bonifico', true);

        res.status(201).json({ message: 'Bonifico effettuato con successo' });
    } catch (error) {
        await logService.createLog(req, 'Operazione Bonifico', false);

        res.status(500).json({ error: (error as Error).message });
    }
}

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
