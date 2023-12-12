import { Role } from "../enums/Role";

export interface User {
    id: number;
    userName: string;
    mail: string;
    role: Role;
    convertionsCount: number;
    subscriptionId: number;
}