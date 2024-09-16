import { IsEmail, IsString, MinLength } from "class-validator";
import { MatchesPasswordPattern } from "../../utils/matchesPasswordPattern";

export class AddUserDTO {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    username: string;

    @MinLength(8)
    @MatchesPasswordPattern({
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    })
    password: string;
}

export class LoginDTO {
    @IsEmail()
    username: string;

    @IsString()
    password: string;
}