import { IsString } from 'class-validator';

export class CreateCategoryDTO {
    @IsString()
    title: string;
    @IsString()
    type: string;
}
