import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload, JwtRawPayload } from './strategies/jwt.strategy'

@Injectable()
export class TokenService {
	private readonly JWT_ACCESS_TOKEN_TTL: string
	private readonly JWT_REFRESH_TOKEN_TTL: string

	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService
	) {
		this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
			'JWT_ACCESS_TOKEN_TTL'
		)
		this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
			'JWT_REFRESH_TOKEN_TTL'
		)
	}

	generateTokens(payload: JwtPayload) {
		const cleanPayload = this.cleanPayload(payload)

		const access_token = this.jwtService.sign(cleanPayload, {
			expiresIn: this.JWT_ACCESS_TOKEN_TTL,
		})

		const refresh_token = this.jwtService.sign(cleanPayload, {
			expiresIn: this.JWT_REFRESH_TOKEN_TTL,
		})

		return { access_token, refresh_token }
	}

	verifyRefreshToken(token: string): JwtPayload {
		try {
			const payload = this.jwtService.verify(token)
			return this.cleanPayload(payload)
		} catch (error) {
			throw new UnauthorizedException('Недействительный refresh token')
		}
	}

	private cleanPayload(payload: JwtRawPayload): JwtPayload {
		const { exp, iat, ...cleaned } = payload
		return cleaned
	}
}
