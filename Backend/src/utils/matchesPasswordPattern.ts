import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function MatchesPasswordPattern(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "matchesPasswordPattern",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
                    return typeof value === 'string' && passwordRegex.test(value); 
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
                }
            }
        });
    };
}
