import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import * as fs from 'fs'
import * as path from 'path'
import { PrismaService } from 'src/prisma/prisma.service'
import { AttachmentResponseDto } from './dto/attachment-response.dto'
import { Attachment } from 'generated/prisma'

@Injectable()
export class AttachmentsService {
	constructor(private readonly prisma: PrismaService) {}

	async uploadMany(
		taskId: string,
		files: Express.Multer.File[],
		userId: string
	) {
		const attachments: Attachment[] = []

		for (const file of files) {
			const attachment = await this.prisma.attachment.create({
				data: {
					filename: file.originalname,
					url: file.path,
					createdById: userId,
					taskId,
				},
			})

			attachments.push(attachment)
		}

		return attachments.map((att) =>
			plainToInstance(AttachmentResponseDto, att, {
				excludeExtraneousValues: true,
			})
		)
	}

	async findAll(taskId: string): Promise<AttachmentResponseDto[]> {
		const attachments = await this.prisma.attachment.findMany({
			where: { taskId },
		})

		return attachments.map((att) =>
			plainToInstance(AttachmentResponseDto, att, {
				excludeExtraneousValues: true,
			})
		)
	}

	async remove(
		taskId: string,
		attachmentId: string,
		userId: string
	): Promise<boolean> {
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

		if (!attachment || attachment.taskId !== taskId)
			throw new NotFoundException('Вложение не найдено')

		const filePath = path.join(
			process.cwd(),
			'uploads',
			'attachments',
			path.basename(attachment.url)
		)

		if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

		await this.prisma.attachment.delete({ where: { id: attachmentId } })

		return true
	}
}
