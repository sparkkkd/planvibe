import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { User } from 'generated/prisma'

export const CurrentUser = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest() as Request
		const user = request.user as User
		return data ? user[data] : user
	}
)
