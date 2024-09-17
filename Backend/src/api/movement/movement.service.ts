import { Movement } from './movement.entity';
import { MovementModel } from './movement.model';
import { NotFoundError } from '../../errors/not-found';
import { CreateMovementDTO } from './movement.dto';
import { Types } from 'mongoose';

export class MovementService {
    constructor(private movementModel: typeof MovementModel) { }

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








    async create(todoDTO: CreateTodoDTO, userId: string): Promise<Todo> {
        const createdBy = new Types.ObjectId(userId);
        const newTodo: Todo = {
            ...todoDTO,
            createdBy: createdBy
        }
        const createdTodo = new this.todoModel(newTodo);
        return (await createdTodo.save()).populate('createdBy assignedTo');

    }

    async markAsChecked(id: string): Promise<Todo | null> {
        const updatedTodo = await this.todoModel.findByIdAndUpdate(id, { completed: true }, { new: true }).exec();
        if (!updatedTodo) {
            throw new NotFoundError();
        }
        return updatedTodo;
    }

    async markAsNotChecked(id: string): Promise<Todo | null> {
        const updatedTodo = await this.todoModel.findByIdAndUpdate(id, { completed: false }, { new: true }).exec();
        if (!updatedTodo) {
            throw new NotFoundError();
        }
        return updatedTodo;
    }

    async getTodoById(todoId: string) {
        return TodoModel.findById(todoId);

    };

    async isTodoCreatedByCurrentUser(todoId: string, userId: string) {
        const todo = await TodoModel.findById(todoId);
        return todo && todo.createdBy?.toString() == userId;
    };

    async isTodoAssignedToCurrentUser(todoId: string, userId: string) {
        const todo = await TodoModel.findById(todoId);
        return todo && todo.assignedTo?.toString() == userId;
    };

    async assignUserToTodo(todoId: string, assignedUserId: string) {
        const todo = await TodoModel.findById(todoId);
        if (!todo) {
            throw new NotFoundError()
        }

        const assignedUserObjectId = new Types.ObjectId(assignedUserId);
        todo.assignedTo = assignedUserObjectId;
        todo.save();

        return todo.populate('createdBy assignedTo');
    };

}
