import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';
export declare class TokenService {
    private readonly configService;
    private readonly jwtService;
    private readonly JWT_ACCESS_TOKEN_TTL;
    private readonly JWT_REFRESH_TOKEN_TTL;
    constructor(configService: ConfigService, jwtService: JwtService);
    generateTokens(payload: JwtPayload): {
        access_token: string;
        refresh_token: string;
    };
    verifyRefreshToken(token: string): JwtPayload;
    private cleanPayload;
}
