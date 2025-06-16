import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ProjectMemberGuard implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest()
		const userId = req.user.id
		const projectId = req.params.projectId

		const isMember = await this.prisma.projectMember.findFirst({
			where: {
				projectId,
				userId,
			},
		})

		if (!isMember)
			throw new ForbiddenException('Вы не являетесь участником проекта')

		return true
	}
}
