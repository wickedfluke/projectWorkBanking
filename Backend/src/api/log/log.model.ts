import mongoose from 'mongoose';
import { Log } from './log.entity';

const logSchema = new mongoose.Schema<Log>({
    ip: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    operation: {type: String, required: true},
    succeful: {type: Boolean, required: true},
});

logSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const LogModel = mongoose.model<Log>('Log', logSchema);
