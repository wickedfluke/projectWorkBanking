import { IsString, IsDateString, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMovementDTO {

    @IsMongoId()
    bankAccount?: Types.ObjectId;
    @IsDateString()
    date: Date;
    @IsNumber()
    amount: string;
    @IsNumber()
    balance: string;
    @IsMongoId()
    category?: Types.ObjectId;
    @IsString()
    description: string;
}
