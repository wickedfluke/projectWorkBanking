import { MinLength } from "class-validator";
import { MatchesPasswordPattern } from "../../utils/matchesPasswordPattern";

export class ChangePasswordDTO {

    @MinLength(8)
    @MatchesPasswordPattern({
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    })
    newPassword: string;
}