import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly SALT_ROUNDS;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("generated/prisma").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateUser(dto: UpdateUserDto): Promise<string>;
}
