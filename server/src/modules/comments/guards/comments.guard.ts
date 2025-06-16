import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Request } from 'express'
import { User } from 'generated/prisma'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CommentsGuard implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request

		const user = request.user as User
		const commentId = request.params.id

		const comment = await this.prisma.comment.findUnique({
			where: { id: commentId },
			include: {
				task: {
					include: {
						project: true,
					},
				},
			},
		})

		if (!comment) throw new NotFoundException('Комментарий не найден')

		const isCommentOwner = comment.authorId === user.id
		const isProjectOwner = comment.task.project.ownerId === user.id

		if (!isCommentOwner && !isProjectOwner)
			throw new ForbiddenException(
				'У вас нет прав для удаления этого комментария'
			)

		return true
	}
}
