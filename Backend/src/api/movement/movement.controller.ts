import { NextFunction, Request, Response } from 'express';
import { movementService } from './movement.service';
import { Parser } from 'json2csv';
import { logService } from '../log/log.service';
import moment from 'moment';

export async function listMovementsWithBalanceController(req: Request, res: Response) {
    const { number } = req.query;
    const user = req.user!;
    const userId = user.id!;

    try {
        const movements = await movementService.listMovementsWithBalance(Number(number), userId);
        res.json(movements);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function listMovementsByCategoryController(req: Request, res: Response) {
    const { number, categoryId } = req.query;
    const user = req.user!;
    const userId = user.id!;
    try {
        const movements = await movementService.listMovementsByCategory(Number(number), categoryId as string, userId);
        res.json(movements);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function listMovementsByDateRangeController(req: Request, res: Response) {
    const { number } = req.query;
    const {startDate, endDate} = req.body;
    const user = req.user!;
    const userId = user.id!;

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
    const user = req.user!;
    const userId = user.id!;

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
    const user = req.user!;
    const userId = user.id!;

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
        const number  = req.query.number;
        const result = await movementService.listMovementsWithBalance(Number(number), userId);
        const movements = result.movements;
        const formattedMovements = movements.map((movement: any) => ({
            ...movement,
            date: moment(movement.date).format('DD/MM/YYYY') 
        }));
        const fields = ['date', 'amount', 'categoryName.title'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(formattedMovements);
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
        const categoryId  = req.query.categoryId;
        const number  = req.query.number;

        console.log(categoryId);
        console.log(number);
        console.log(userId);

        if (typeof categoryId !== 'string') {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        const result = await movementService.listMovementsByCategory(Number(number), categoryId, userId);
        const movements = result.movements;
        const formattedMovements = movements.map((movement: any) => ({
            ...movement,
            date: moment(movement.date).format('DD/MM/YYYY') 
        }));

        const fields = ['date', 'amount', 'categoryName.title'];
        const opts = { fields };

        const parser = new Parser(opts);
        const csv = parser.parse(formattedMovements);
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
        const number  = req.query.number;
        const { startDate, endDate } = req.body;

        if (typeof startDate !== 'string' || typeof endDate !== 'string') {
            return res.status(400).json({ error: 'Invalid date range' });
        }

        const result = await movementService.listMovementsByDateRange(Number(number), startDate, endDate, userId);
        const movements = result.movements;
        const formattedMovements = movements.map((movement: any) => ({
            ...movement,
            date: moment(movement.date).format('DD/MM/YYYY') 
        }));
        const fields = ['date', 'amount', 'categoryName.title'];
        const opts = { fields };

        const parser = new Parser(opts);
        const csv = parser.parse(formattedMovements);
        res.header('Content-Type', 'text/csv');
        res.attachment('movements.csv');

        return res.send(csv);
    } catch (err) {
        next(err);
    }
};

export const getMovementById = async (req: Request, res: Response) => {
    const { movementId } = req.params;
    const user = req.user!;
    const userId = user.id!;

    try {
        const movement = await movementService.getMovementById(userId, movementId);
        res.json(movement);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
