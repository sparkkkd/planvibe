import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskResponseDto } from './dto/task-response.dto'
import { plainToInstance } from 'class-transformer'
import { UpdateTaskDto } from './dto/update-task.dto'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'
import { SortOrder, TaskFilterDto } from './dto/task-filter.dto'

@Injectable()
export class TasksService {
	constructor(private readonly prisma: PrismaService) {}

	private buildWhereFilters(filter: TaskFilterDto) {
		const where: any = {}
		const { status, priority, assigneeId, dueDateFrom, dueDateTo, search } =
			filter

		if (status) where.status = status
		if (priority) where.priority = priority
		if (assigneeId) where.assigneeId = assigneeId

		if (dueDateFrom || dueDateTo) {
			where.dueDate = {}
			if (dueDateFrom) where.dueDate.gte = new Date(dueDateFrom)
			if (dueDateTo) where.dueDate.lte = new Date(dueDateTo)
		}

		if (search) {
			where.OR = [
				{
					title: {
						contains: search,
						mode: 'insensitive',
					},
				},
				{
					description: {
						contains: search,
						mode: 'insensitive',
					},
				},
			]
		}

		return where
	}

	async create(
		projectId: string,
		dto: CreateTaskDto,
		userId: string
	): Promise<TaskResponseDto> {
		const { title, assigneeId, description, dueDate, priority } = dto

		if (dto.assigneeId) {
			const assigneeIsMember = await this.prisma.projectMember.findFirst({
				where: {
					projectId,
					userId: dto.assigneeId,
				},
			})

			if (!assigneeIsMember) {
				throw new ForbiddenException(
					'Пользователь не является участником проекта'
				)
			}
		}

		const task = await this.prisma.task.create({
			data: {
				title,
				description,
				priority: priority ?? 'LOW',
				dueDate: dueDate ? new Date(dueDate) : undefined,
				assigneeId,
				projectId,
				createdById: userId,
			},
		})

		return plainToInstance(TaskResponseDto, task, {
			excludeExtraneousValues: true,
		})
	}

	async getAllTasks(
		projectId: string,
		filter: TaskFilterDto
	): Promise<TaskResponseDto[]> {
		const where = {
			projectId,
			...this.buildWhereFilters(filter),
		}

		const orderBy =
			filter.sortBy && filter.sortOrder
				? { [filter.sortBy]: filter.sortOrder }
				: { createdAt: SortOrder.DESC }

		const tasks = await this.prisma.task.findMany({ where, orderBy })

		return plainToInstance(TaskResponseDto, tasks, {
			excludeExtraneousValues: true,
		})
	}

	async getById(projectId: string, taskId: string) {
		const task = await this.prisma.task.findFirst({
			where: {
				id: taskId,
				projectId,
			},
		})

		if (!task) throw new NotFoundException('Задача не найдена')

		return plainToInstance(TaskResponseDto, task, {
			excludeExtraneousValues: true,
		})
	}

	async update(
		projectId: string,
		taskId: string,
		dto: UpdateTaskDto,
		userId: string
	): Promise<TaskResponseDto> {
		const task = await this.prisma.task.findUnique({
			where: { id: taskId },
			include: { project: true },
		})

		if (!task || task.projectId !== projectId)
			throw new NotFoundException('Задача не найдена')

		const isAuthor = task.createdById === userId
		const isAssignee = task.assigneeId === userId
		const isProjectOwner = task.project.ownerId === userId

		if (isAssignee && !isAuthor && isProjectOwner) {
			const allowedFields = ['status']
			const hasDisallowedFields = Object.keys(dto).some(
				(key) => !allowedFields.includes(key)
			)

			if (hasDisallowedFields)
				throw new ForbiddenException(
					'Исполнитель может изменять только статус задачи'
				)
		}

		if (!isAuthor && !isProjectOwner && isAssignee)
			throw new ForbiddenException('Вы не можете редактировать эту задачу')

		const updatedTask = await this.prisma.task.update({
			where: { id: taskId },
			data: {
				...dto,
			},
		})

		return plainToInstance(TaskResponseDto, updatedTask, {
			excludeExtraneousValues: true,
		})
	}

	async remove(
		projectId: string,
		taskId: string,
		userId: string
	): Promise<boolean> {
		const task = await this.prisma.task.findUnique({
			where: { id: taskId },
			include: { project: true },
		})

		if (!task || task.projectId !== projectId)
			throw new NotFoundException('Задача не найдена')

		const isAuthor = task.createdById === userId
		const isProjectOwner = task.project.ownerId === userId

		if (!isAuthor && !isProjectOwner)
			throw new ForbiddenException('Вы не можете удалить эту задачу')

		await this.prisma.$transaction([
			this.prisma.comment.deleteMany({ where: { taskId } }),
			this.prisma.attachment.deleteMany({ where: { taskId } }),
			this.prisma.task.delete({ where: { id: taskId } }),
		])

		return true
	}

	async updateStatus(
		projectId: string,
		taskId: string,
		dto: UpdateTaskStatusDto,
		userId: string
	): Promise<boolean> {
		const task = await this.prisma.task.findUnique({
			where: { id: taskId },
			include: { project: true },
		})

		if (!task || task.projectId !== projectId)
			throw new NotFoundException('Задача не найдена')

		const isOwner = task.project.ownerId === userId
		const isAssignee = task.assigneeId === userId

		if (!isOwner && !isAssignee)
			throw new ForbiddenException('Вы не можете изменить статус этой задачи')

		await this.prisma.task.update({
			where: { id: taskId },
			data: { status: dto.status },
		})

		return true
	}
}
