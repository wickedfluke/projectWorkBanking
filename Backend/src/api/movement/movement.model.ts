import { Movement } from './movement.entity';
import mongoose from 'mongoose';
import { Types } from 'mongoose';

const movementSchema = new mongoose.Schema<Movement>({
    bankAccount: {
        type: Types.ObjectId,
        ref: "BankAccount"
    },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    category: {
        type: Types.ObjectId,
        ref: "Category"
    },
    description: { type: String, required: true }
});

movementSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const MovementModel = mongoose.model<Movement>('Movement', movementSchema);
