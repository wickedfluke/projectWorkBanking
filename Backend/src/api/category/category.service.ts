import { Category } from './category.entity';
import { CategoryModel } from './category.model';
import { CreateCategoryDTO } from './category.dto';

export class CategoryService {
    constructor(private categoryModel: typeof CategoryModel) { }

    async list() {
        let query: any = {};
        const items = await CategoryModel.find(query);
        const sortedItems = items
        return sortedItems;
    }

    async create(categoryDTO: CreateCategoryDTO): Promise<Category> {
        const newCategory: Category = {
            ...categoryDTO,
        }
        const createdCategory = new this.categoryModel(newCategory);
        return (await createdCategory.save()).toObject();
    }

}
