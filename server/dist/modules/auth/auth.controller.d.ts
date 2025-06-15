import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { User } from 'generated/prisma';
import { UserDto } from './dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(res: Response, dto: RegisterDto): Promise<{
        access_token: string;
    }>;
    login(res: Response, dto: LoginDto): Promise<{
        access_token: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        access_token: string;
    } | undefined>;
    me(user: User): Promise<UserDto>;
    logout(res: Response): Promise<boolean>;
}
