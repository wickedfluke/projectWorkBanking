import { User } from "../../../api/account/account.entity";

export interface UserIdentity {
    id: string;
    provider: 'local';
    credentials: {
        username: string;
        hashedPassword: string;
    };
    user: User
}