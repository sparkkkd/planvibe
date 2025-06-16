import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { ProjectMemberGuard } from '../../common/guards/project-member.guard'
import { CreateTaskDto } from './dto/create-task.dto'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import {
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger'
import { TaskResponseDto } from './dto/task-response.dto'
import { Authorization } from '../auth/decorators/authorization.decorator'
import { UpdateTaskDto } from './dto/update-task.dto'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'
import { TaskFilterDto } from './dto/task-filter.dto'

@ApiTags('Задачи')
@Authorization()
@Controller('projects/:projectId/tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	@UseGuards(ProjectMemberGuard)
	@ApiOperation({
		summary: 'Создание задачи',
		description:
			'Доступно только для участников проекта. Создает задачу и возвращает ее в ответ',
	})
	@ApiOkResponse({ type: TaskResponseDto })
	@ApiForbiddenResponse({
		description: 'Пользователь не является участником проекта',
	})
	async create(
		@Param('projectId') projectId: string,
		@Body() dto: CreateTaskDto,
		@CurrentUser('id') userId: string
	) {
		return this.tasksService.create(projectId, dto, userId)
	}

	@Get()
	@UseGuards(ProjectMemberGuard)
	@ApiOperation({
		summary: 'Получение списка задач по проекту',
		description:
			'Доступно только для участников проекта. Возвращает массив задач для данного проекта',
	})
	@ApiOkResponse({ type: TaskResponseDto })
	async getAll(
		@Param('projectId') projectId: string,
		@Query() filter: TaskFilterDto
	) {
		return this.tasksService.getAllTasks(projectId, filter)
	}

	@Get(':taskId')
	@UseGuards(ProjectMemberGuard)
	@ApiOperation({
		summary: 'Получение задачи по проекту',
		description:
			'Доступно только для участников проекта. Возвращает объект с задачой',
	})
	@ApiOkResponse({ type: TaskResponseDto })
	async getById(
		@Param('projectId') projectId: string,
		@Param('taskId') taskId: string
	) {
		return this.tasksService.getById(projectId, taskId)
	}

	@Patch(':taskId')
	@UseGuards(ProjectMemberGuard)
	@ApiOperation({
		summary: 'Обновление задачи',
		description:
			'Обновить задачу может только: создатель задачи, владелец проекта, исполнитель задачи (исполнитель может поменять только статус задачи, например из IN_PROGRESS в DONE)',
	})
	@ApiOkResponse({ type: TaskResponseDto })
	@ApiForbiddenResponse({
		description: 'Исполнитель может изменять только статус задачи',
	})
	async update(
		@Param('projectId') projectId: string,
		@Param('taskId') taskId: string,
		@Body() dto: UpdateTaskDto,
		@CurrentUser('id') userId: string
	) {
		return this.tasksService.update(projectId, taskId, dto, userId)
	}

	@Delete(':taskId')
	@UseGuards(ProjectMemberGuard)
	@ApiOperation({
		summary: 'Удаление задачи',
		description:
			'Удалить задачу может только владелец проекта или создатель задачи',
	})
	@ApiOkResponse({ type: 'boolean', example: true })
	@ApiNotFoundResponse({ description: 'Задача не найдена' })
	@ApiForbiddenResponse({ description: 'Вы не можете удалить эту задачу' })
	async remove(
		@Param('projectId') projectId: string,
		@Param('taskId') taskId: string,
		@CurrentUser('id') userId: string
	) {
		await this.tasksService.remove(projectId, taskId, userId)
	}

	@Patch(':taskId/status')
	@UseGuards(ProjectMemberGuard)
	@ApiOperation({
		summary: 'Изменение статуса задачи',
		description:
			'Изменить статус может владелец проекта или исполнитель задачи',
	})
	@ApiOkResponse({ type: 'boolean', example: true })
	@ApiNotFoundResponse({ description: 'Задача не найдена' })
	@ApiForbiddenResponse({
		description: 'Вы не можете изменить статус этой задачи',
	})
	async updateStatus(
		@Param('projectId') projectId: string,
		@Param('taskId') taskId: string,
		@Body() dto: UpdateTaskStatusDto,
		@CurrentUser('id') userId: string
	) {
		await this.tasksService.updateStatus(projectId, taskId, dto, userId)
	}
}
