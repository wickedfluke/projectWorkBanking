import { Types } from "mongoose";

export interface Movement {
    id?: string;
    bankAccount?: Types.ObjectId;
    date: Date;
    amount: number;
    balance: number;
    category?: Types.ObjectId;
    description: string;
}
