import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly SALT_ROUNDS;
    constructor(prisma: PrismaService);
    createUser(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        createdAt: Date;
    }>;
}
