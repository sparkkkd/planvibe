import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'

export interface JwtPayload {
	id: string
}

export interface JwtRawPayload extends JwtPayload {
	exp?: number
	iat?: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly config: ConfigService,
		private readonly authService: AuthService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			algorithms: ['HS256'],
			secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
		})
	}

	async validate(payload: JwtPayload) {
		return await this.authService.validate(payload.id)
	}
}
