import { IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateLogDTO {

    @IsString()
    ip: string;

    @IsDateString()
    date: Date;

    @IsString()
    operation: string;

    @IsBoolean()
    succeful: boolean;
}
