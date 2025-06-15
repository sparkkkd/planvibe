import { Role } from 'generated/prisma';
export declare class UserDto {
    id: string;
    email: string;
    name: string;
    role: Role;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
