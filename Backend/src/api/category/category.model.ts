import mongoose from 'mongoose';
import { Category } from './category.entity';

const categorySchema = new mongoose.Schema<Category>({
    title: { type: String, required: true },
    type: { type: String, required: true }
});

categorySchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const CategoryModel = mongoose.model<Category>('Category', categorySchema);
