import { Movement } from './movement.entity';
import { MovementModel } from './movement.model';
import { NotFoundError } from '../../errors/not-found';
import { CreateMovementDTO } from './movement.dto';
import { Types } from 'mongoose';

class MovementService {

    async listMovementsWithBalance(number: number, userId: string) {
        let query: any = { bankAccount: userId };

        const items = await MovementModel.find(query).sort({ date: -1 }).limit(number).populate('category');

        const lastMovement = await MovementModel
            .findOne(query)
            .sort({ dueDate: -1 });

        const finalBalance = lastMovement?.balance || 0;

        const movementData = items.map(item => ({
            data: item.date,
            importo: item.amount,
            nomeCategoria: item.category
        }));

        return {
            movements: movementData,
            balance: finalBalance
        };
    }

    async listMovementsByCategory(number: number, categoryId: string, userId: string) {

        let query: any = {
            bankAccount: userId,
            category: categoryId,
        };

        const items = await MovementModel
            .find(query)
            .sort({ dueDate: -1 })
            .limit(number)
            .populate('category');

        const movementData = items.map(item => ({
            data: item.date,
            importo: item.amount,
            nomeCategoria: item.category
        }));

        return {
            movements: movementData
        }
    }

    async listMovementsByDateRange(number: number, startDate: string, endDate: string, userId: string) {
        
        let query: any = {
            bankAccount: userId,
            dueDate: {
                $gte: new Date(startDate),  
                $lte: new Date(endDate)  
            }
        };
        
        const items = await MovementModel
            .find(query)
            .sort({ dueDate: -1 })  
            .limit(number)  
            .populate('category');  

        const movementData = items.map(item => ({
            data: item.date,
            importo: item.amount,
            nomeCategoria: item.category
        }));

        return {
            movements: movementData
        }
    }

    async createOpeningMovement(userId: string): Promise<void> {
        const openingMovement = {
            userId,
            date: new Date(),
            description: 'Apertura conto',
            amount: 0,
            balance: 0,
            category: 'Entrata'
        };

        await MovementModel.create(openingMovement); 
    }

}

export const movementService = new MovementService();
