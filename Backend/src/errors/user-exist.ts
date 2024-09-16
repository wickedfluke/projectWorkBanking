export class UserExistsError extends Error {
    constructor() {
        super();
        this.name = 'UserExists';
        this.message = 'Username already in use';
    }
}