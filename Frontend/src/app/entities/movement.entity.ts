import { User } from "./user.entity";
import { Category } from "./category.entity";

export interface Movement {
    id?: string;
    bankAccount?: User;
    date: Date;
    amount: number;
    balance: number;
    category?: Category;
    description: string;
}
