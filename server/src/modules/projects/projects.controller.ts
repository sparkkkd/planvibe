import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { Authorization } from '../auth/decorators/authorization.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { CreateProjectDto } from './dto/create-project.dto'
import {
	ApiBadRequestResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger'
import { ProjectResponseDto } from './dto/project-response.dto'

@ApiTags('Проекты')
@Authorization()
@Controller('projects')
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Post()
	@ApiOperation({
		summary: 'Создание проекта',
		description: 'Создает в базе данных проект и присваивает ему владельца',
	})
	@ApiOkResponse({ type: ProjectResponseDto })
	@ApiBadRequestResponse({ description: 'Невалидные вводные данные' })
	@HttpCode(HttpStatus.CREATED)
	createProject(
		@CurrentUser('id') userId: string,
		@Body() dto: CreateProjectDto
	) {
		return this.projectsService.create(userId, dto)
	}

	@Get()
	@ApiOperation({
		summary: 'Получение списка проектов, в которых участвует пользователь',
	})
	@ApiOkResponse({ type: ProjectResponseDto, isArray: true })
	@HttpCode(HttpStatus.OK)
	getProjectsForUser(@CurrentUser('id') userId: string) {
		return this.projectsService.getProjectForUser(userId)
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Получение проекта по id',
		description:
			'Получает определенный проект по уникальному идентификатору. Не позволяет получить проект пользователю, не являющимся участником',
	})
	@ApiOkResponse({ type: ProjectResponseDto, isArray: true })
	@ApiForbiddenResponse({ description: 'Вы не являетесь участником проекта' })
	@HttpCode(HttpStatus.OK)
	getProjectById(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.projectsService.getProjectById(id, userId)
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Обновление проекта',
		description:
			'Обновляет проект по уникальному идентификатору. Позволяет обновить проект только владельцу',
	})
	@ApiOkResponse({ type: ProjectResponseDto })
	@ApiForbiddenResponse({ description: 'Вы не являетесь владельцем проекта' })
	@HttpCode(HttpStatus.OK)
	updateProject(
		@Param('id') id: string,
		@CurrentUser('id') userId: string,
		@Body() dto: CreateProjectDto
	) {
		return this.projectsService.updateProject(id, userId, dto)
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Удаление проекта',
		description:
			'Удаляет проект по уникальному идентификатору. Позволяет удалить проект только владельцу',
	})
	@ApiOkResponse({ type: 'boolean', example: true })
	@ApiForbiddenResponse({ description: 'Вы не являетесь владельцем проекта' })
	@HttpCode(HttpStatus.OK)
	deleteProject(
		@Param('id') projectId: string,
		@CurrentUser('id') userId: string
	) {
		return this.projectsService.deleteProject(projectId, userId)
	}
}
