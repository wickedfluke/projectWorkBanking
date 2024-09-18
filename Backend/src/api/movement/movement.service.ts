import { UserModel } from '../account/account.model';
import { MovementModel } from './movement.model';


export class MovementService {

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
            category: '66e835cbf832b9e813f119a4'
        };

        await MovementModel.create(openingMovement);
    }

    async createPhoneMovement(userId: string, phoneNumber: string, operator: string, rechargeAmount: number): Promise<void> {
        let query: any = { bankAccount: userId };
        const lastMovement = await MovementModel
            .findOne(query)
            .sort({ dueDate: -1 });
        const finalBalance = lastMovement?.balance || 0;
        if (finalBalance < rechargeAmount) {
            throw new Error('Saldo insufficiente per effettuare la ricarica');
        }
        const description = `Ricarica telefonica: ${operator} - ${phoneNumber}`;
        const newBalance = finalBalance - rechargeAmount;
        const phoneMovement = {
            userId,
            date: new Date(),
            description,
            amount: rechargeAmount,
            balance: newBalance,
            category: '66e8365ef832b9e813f119b0'
        };

        await MovementModel.create(phoneMovement);
    }

    async createTransferMovement(userId: string, receiverIban: string, transferAmount: number): Promise<void> {
        let query: any = { bankAccount: userId };
        const lastMovement = await MovementModel
            .findOne(query)
            .sort({ dueDate: -1 });
        const finalBalance = lastMovement?.balance || 0;
        if (finalBalance < transferAmount) {
            throw new Error('Saldo insufficiente per effettuare il bonifico');
        }
        const receiver = await UserModel.findOne({ iban: receiverIban });
        const sender = await UserModel.findOne({ _id: userId });
        const description = `Bonifico in uscita verso: ${receiverIban} | ${receiver?.fullName}`;
        const newBalance = finalBalance - transferAmount;
        const exitTransferMovement = {
            userId,
            date: new Date(),
            description,
            amount: transferAmount,
            balance: newBalance,
            category: '66e8361af832b9e813f119aa'
        };

        await MovementModel.create(exitTransferMovement);

        const description2 = `Bonifico in entrata da: ${sender?.iban} | ${sender?.fullName}`;
        const newBalance2 = finalBalance + transferAmount;
        const incomingTransferMovement = {
            userId: receiver?._id,
            date: new Date(),
            description2,
            amount: transferAmount,
            balance: newBalance2,
            category: '66e835dff832b9e813f119a6'
        };

        await MovementModel.create(incomingTransferMovement);
    }

}

export const movementService = new MovementService();
