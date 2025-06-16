import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import type { Request, Response } from 'express'
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AuthResponseDto } from './dto/auth.dto'
import { Authorization } from './decorators/authorization.decorator'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from 'generated/prisma'
import { plainToInstance } from 'class-transformer'
import { UserDto } from './dto/user.dto'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({
		summary: 'Регистрация пользователя',
		description: 'Создает новый аккаунт для пользователя',
	})
	@ApiOkResponse({ type: AuthResponseDto })
	@ApiBadRequestResponse({ description: 'Некорректные данные' })
	@ApiConflictResponse({
		description: 'Пользователь с такой почтой уже существует',
	})
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: RegisterDto
	) {
		return this.authService.register(res, dto)
	}

	@ApiOperation({
		summary: 'Вход пользователя в аккаунт',
		description:
			'Авторизует пользователя, выдает токен доступа и вшивает рефреш токен в cookie',
	})
	@ApiOkResponse({ type: AuthResponseDto })
	@ApiBadRequestResponse({ description: 'Некорректные данные' })
	@ApiNotFoundResponse({ description: 'Пользователь не найден' })
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: LoginDto
	) {
		return this.authService.login(res, dto)
	}

	@ApiOperation({
		summary: 'Обновление токена доступа',
		description: 'Выдает новый, актуальный токен доступа',
	})
	@ApiOkResponse({ type: AuthResponseDto })
	@ApiUnauthorizedResponse({ description: 'Недействительный refresh token' })
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.refresh(req, res)
	}

	@ApiOperation({
		summary: 'Получение информации о текущем пользователе',
		description: 'Возвращает информацию о текущем пользователе',
	})
	@ApiOkResponse({ type: UserDto })
	@ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
	@Authorization()
	@Get('@me')
	@HttpCode(HttpStatus.OK)
	async me(@CurrentUser() user: User) {
		return plainToInstance(UserDto, user, { excludeExtraneousValues: true })
	}

	@ApiOperation({
		summary: 'Выход из системы',
		description:
			'Обеспечивает выход из аккаута. Очищает cookie с рефреш токеном',
	})
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}
}
