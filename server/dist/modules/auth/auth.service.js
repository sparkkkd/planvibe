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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const is_dev_util_1 = require("../../common/utils/is-dev.util");
const parse_time_util_1 = require("../../common/utils/parse-time.util");
const token_service_1 = require("./token.service");
let AuthService = class AuthService {
    prisma;
    configService;
    jwtService;
    tokenService;
    SALT_ROUNDS = 10;
    COOKIE_DOMAIN;
    constructor(prisma, configService, jwtService, tokenService) {
        this.prisma = prisma;
        this.configService = configService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.COOKIE_DOMAIN = configService.getOrThrow('COOKIE_DOMAIN');
    }
    async login(res, dto) {
        const { email, password } = dto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user)
            throw new common_1.NotFoundException('Пользователь не найден');
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            throw new common_1.NotFoundException('Пользователь не найден');
        return this.auth(res, {
            id: user.id,
        });
    }
    async register(res, dto) {
        const { email, name, password } = dto;
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing)
            throw new common_1.ConflictException('Пользователь с такой почтой уже существует');
        const user = await this.prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, this.SALT_ROUNDS),
                name,
            },
        });
        return this.auth(res, {
            id: user.id,
        });
    }
    async logout(res) {
        this.setCookie(res, '', new Date(0));
        return true;
    }
    async validate(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user)
            throw new common_1.NotFoundException('Пользователь не найден');
        return user;
    }
    async refresh(req, res) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken)
            throw new common_1.UnauthorizedException('Недействительный refresh token');
        const payload = this.tokenService.verifyRefreshToken(refreshToken);
        if (payload) {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: payload.id,
                },
                select: {
                    id: true,
                },
            });
            if (!user)
                throw new common_1.NotFoundException('Пользователь не найден');
            return this.auth(res, payload);
        }
    }
    auth(res, payload) {
        const { access_token, refresh_token } = this.tokenService.generateTokens(payload);
        this.setCookie(res, refresh_token, new Date(Date.now() +
            (0, parse_time_util_1.parseTime)(this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL'))));
        return { access_token };
    }
    setCookie(res, value, expires) {
        res.cookie('refresh_token', value, {
            expires,
            httpOnly: true,
            domain: this.COOKIE_DOMAIN,
            secure: !(0, is_dev_util_1.isDev)(this.configService),
            sameSite: (0, is_dev_util_1.isDev)(this.configService) ? 'none' : 'lax',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService,
        token_service_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map