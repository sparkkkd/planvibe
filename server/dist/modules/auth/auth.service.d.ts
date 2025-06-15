import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { TokenService } from './token.service';
export declare class AuthService {
    private readonly prisma;
    private readonly configService;
    private readonly jwtService;
    private readonly tokenService;
    private readonly SALT_ROUNDS;
    private readonly COOKIE_DOMAIN;
    constructor(prisma: PrismaService, configService: ConfigService, jwtService: JwtService, tokenService: TokenService);
    login(res: Response, dto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(res: Response, dto: RegisterDto): Promise<{
        access_token: string;
    }>;
    logout(res: Response): Promise<boolean>;
    validate(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("generated/prisma").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refresh(req: Request, res: Response): Promise<{
        access_token: string;
    } | undefined>;
    private auth;
    private setCookie;
}
