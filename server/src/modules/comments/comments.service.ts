import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { CommentResponseDto } from './dto/comment-response.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class CommentsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		taskId: string,
		authorId: string,
		dto: CreateCommentDto
	): Promise<CommentResponseDto> {
		const comment = await this.prisma.comment.create({
			data: {
				content: dto.content,
				taskId,
				authorId,
			},
		})

		return plainToInstance(CommentResponseDto, comment, {
			excludeExtraneousValues: true,
		})
	}

	async findAllByTask(taskId: string): Promise<CommentResponseDto[]> {
		const comments = await this.prisma.comment.findMany({
			where: { taskId },
			orderBy: { createdAt: 'asc' },
			include: { author: true },
		})

		return comments.map((comm) =>
			plainToInstance(CommentResponseDto, comm, {
				excludeExtraneousValues: true,
			})
		)
	}

	async update(
		id: string,
		authorId: string,
		dto: UpdateCommentDto
	): Promise<CommentResponseDto> {
		const comment = await this.prisma.comment.findUnique({ where: { id } })

		if (!comment) throw new NotFoundException('Комментарий не найден')

		if (comment.authorId !== authorId)
			throw new ForbiddenException('Вы не можете изменить этот комментарий')

		const updatedComment = await this.prisma.comment.update({
			where: { id },
			data: {
				content: dto.content,
			},
		})

		return plainToInstance(CommentResponseDto, updatedComment, {
			excludeExtraneousValues: true,
		})
	}

	async delete(id: string) {
		const comment = await this.prisma.comment.findUnique({
			where: { id },
			include: {
				task: {
					include: {
						project: true,
					},
				},
			},
		})

		if (!comment) throw new NotFoundException('Комментарий не найден')

		await this.prisma.comment.delete({ where: { id } })

		return true
	}
}
