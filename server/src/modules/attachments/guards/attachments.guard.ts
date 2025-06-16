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
export class AttachmentGuard implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request
		const user = request.user as User
		const attachmentId = request.params.attachmentId

		const attachment = await this.prisma.attachment.findUnique({
			where: { id: attachmentId },
			include: {
				task: {
					include: {
						project: true,
					},
				},
			},
		})

		if (!attachment) throw new NotFoundException('Вложение не найдено')

		const isProjectOwner = attachment.task.project.ownerId === user.id
		const isTaskOwner = attachment.task.createdById === user.id
		const isAttachmentOwner = attachment.createdById === user.id

		if (!isProjectOwner && !isTaskOwner && !isAttachmentOwner) {
			throw new ForbiddenException('Вы не можете удалить это вложение')
		}

		return true
	}
}
