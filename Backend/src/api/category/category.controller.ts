import { NextFunction, Request, Response } from 'express';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryModel } from './category.model';

const categoryService = new CategoryService(CategoryModel);

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await categoryService.list();
        res.json(items);
    } catch (err) {
        next(err);
    }
}

export const createCategory = [
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newCategory: Category = req.body;
            const saved = await categoryService.create(newCategory);
            return res.status(201).json(saved);
        } catch (err) {
            next(err);
        }
    }
];

