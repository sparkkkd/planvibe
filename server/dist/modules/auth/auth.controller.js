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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./dto/auth.dto");
const authorization_decorator_1 = require("./decorators/authorization.decorator");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const class_transformer_1 = require("class-transformer");
const user_dto_1 = require("./dto/user.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(res, dto) {
        return this.authService.register(res, dto);
    }
    async login(res, dto) {
        return this.authService.login(res, dto);
    }
    async refresh(req, res) {
        return this.authService.refresh(req, res);
    }
    async me(user) {
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, user, { excludeExtraneousValues: true });
    }
    async logout(res) {
        return this.authService.logout(res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Регистрация пользователя',
        description: 'Создает новый аккаунт для пользователя',
    }),
    (0, swagger_1.ApiOkResponse)({ type: auth_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Некорректные данные' }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Пользователь с такой почтой уже существует',
    }),
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Вход пользователя в аккаунт',
        description: 'Авторизует пользователя, выдает токен доступа и вшивает рефреш токен в cookie',
    }),
    (0, swagger_1.ApiOkResponse)({ type: auth_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Некорректные данные' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Пользователь не найден' }),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Обновление токена доступа',
        description: 'Выдает новый, актуальный токен доступа',
    }),
    (0, swagger_1.ApiOkResponse)({ type: auth_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Недействительный refresh token' }),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Получение информации о текущем пользователе',
        description: 'Возвращает информацию о текущем пользователе',
    }),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Пользователь не авторизован' }),
    (0, authorization_decorator_1.Authorization)(),
    (0, common_1.Get)('@me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Выход из системы',
        description: 'Обеспечивает выход из аккаута. Очищает cookie с рефреш токеном',
    }),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Авторизация'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map