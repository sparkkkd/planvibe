"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let TokenService = class TokenService {
    configService;
    jwtService;
    JWT_ACCESS_TOKEN_TTL;
    JWT_REFRESH_TOKEN_TTL;
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow('JWT_ACCESS_TOKEN_TTL');
        this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow('JWT_REFRESH_TOKEN_TTL');
    }
    generateTokens(payload) {
        const cleanPayload = this.cleanPayload(payload);
        const access_token = this.jwtService.sign(cleanPayload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL,
        });
        const refresh_token = this.jwtService.sign(cleanPayload, {
            expiresIn: this.JWT_REFRESH_TOKEN_TTL,
        });
        return { access_token, refresh_token };
    }
    verifyRefreshToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            return this.cleanPayload(payload);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Недействительный refresh token');
        }
    }
    cleanPayload(payload) {
        const { exp, iat, ...cleaned } = payload;
        return cleaned;
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map