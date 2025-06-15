import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
export interface JwtPayload {
    id: string;
}
export interface JwtRawPayload extends JwtPayload {
    exp?: number;
    iat?: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly config;
    private readonly authService;
    constructor(config: ConfigService, authService: AuthService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("generated/prisma").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
