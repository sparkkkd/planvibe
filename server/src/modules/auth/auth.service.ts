import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './strategies/jwt.strategy'
import { LoginDto } from './dto/login.dto'
import { Request, Response } from 'express'
import { isDev } from 'src/common/utils/is-dev.util'
import { parseTime } from 'src/common/utils/parse-time.util'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
	private readonly SALT_ROUNDS = 10
	private readonly COOKIE_DOMAIN: string

	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly tokenService: TokenService
	) {
		this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN')
	}

	async login(res: Response, dto: LoginDto) {
		const { email, password } = dto

		const user = await this.prisma.user.findUnique({
			where: { email },
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		const isValidPassword = await bcrypt.compare(password, user.password)

		if (!isValidPassword) throw new NotFoundException('Пользователь не найден')

		return this.auth(res, {
			id: user.id,
		})
	}

	async register(res: Response, dto: RegisterDto) {
		const { email, name, password } = dto

		const existing = await this.prisma.user.findUnique({ where: { email } })

		if (existing)
			throw new ConflictException('Пользователь с такой почтой уже существует')

		const user = await this.prisma.user.create({
			data: {
				email,
				password: await bcrypt.hash(password, this.SALT_ROUNDS),
				name,
			},
		})

		return this.auth(res, {
			id: user.id,
		})
	}

	async logout(res: Response) {
		this.setCookie(res, '', new Date(0))
		return true
	}

	async validate(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async refresh(req: Request, res: Response) {
		const refreshToken = req.cookies['refresh_token']

		if (!refreshToken)
			throw new UnauthorizedException('Недействительный refresh token')

		const payload = this.tokenService.verifyRefreshToken(refreshToken)

		if (payload) {
			const user = await this.prisma.user.findUnique({
				where: {
					id: payload.id,
				},
				select: {
					id: true,
				},
			})

			if (!user) throw new NotFoundException('Пользователь не найден')

			return this.auth(res, payload)
		}
	}

	private auth(res: Response, payload: JwtPayload) {
		const { access_token, refresh_token } =
			this.tokenService.generateTokens(payload)

		this.setCookie(
			res,
			refresh_token,
			new Date(
				Date.now() +
					parseTime(this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL'))
			)
		)

		return { access_token }
	}

	private setCookie(res: Response, value: string, expires: Date) {
		res.cookie('refresh_token', value, {
			expires,
			httpOnly: true,
			domain: this.COOKIE_DOMAIN,
			secure: !isDev(this.configService),
			sameSite: isDev(this.configService) ? 'lax' : 'none',
		})
	}
}
