import { Role } from '../enums/Role';

export interface User {
    Id: number;
    UserName: string;
    Mail: string;
    Password: string;
    Role: Role;
    ConvertionsCount: number;
    SubscriptionId: number;
}