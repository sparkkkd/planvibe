import {
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { AttachmentsService } from './attachments.service'
import {
	ApiBody,
	ApiConsumes,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger'
import { ProjectMemberGuard } from 'src/common/guards/project-member.guard'
import { Authorization } from '../auth/decorators/authorization.decorator'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AttachmentResponseDto } from './dto/attachment-response.dto'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { AttachmentGuard } from './guards/attachments.guard'

@ApiTags('Вложения')
@UseGuards(ProjectMemberGuard)
@Authorization()
@Controller('projects/:projectId/tasks/:taskId/attachments')
export class AttachmentsController {
	constructor(private readonly attachmentsService: AttachmentsService) {}

	@Post()
	@ApiOperation({
		summary: 'Загрузить вложение',
		description:
			'Загружат вложение в задачу и возвращает объект с информацией о вложении. Доступно только участником проекта',
	})
	@ApiOkResponse({ type: AttachmentResponseDto })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				files: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary',
					},
					maxItems: 10,
				},
			},
			maxItems: 10,
		},
	})
	@UseInterceptors(
		FilesInterceptor('files', 10, {
			storage: diskStorage({
				destination: './uploads/attachments',
				filename: (_, file, cb) => {
					const uniqueSuffix =
						Date.now() + '-' + Math.round(Math.random() * 1e9)
					cb(null, uniqueSuffix + extname(file.originalname))
				},
			}),
			limits: {
				fileSize: 6 * 1024 * 1024,
			},
		})
	)
	upload(
		@UploadedFiles() files: Express.Multer.File[],
		@Param('taskId') taskId: string,
		@CurrentUser('id') userId: string
	) {
		return this.attachmentsService.uploadMany(taskId, files, userId)
	}

	@Get()
	@ApiOperation({
		summary: 'Получить список вложений',
		description:
			'Возвращает массив объектов с информацией о вложениях задачи. Доступно только участником проекта',
	})
	@ApiOkResponse({ type: AttachmentResponseDto, isArray: true })
	findAll(@Param('taskId') taskId: string) {
		return this.attachmentsService.findAll(taskId)
	}

	@Delete(':attachmentId')
	@UseGuards(ProjectMemberGuard, AttachmentGuard)
	@ApiOperation({
		summary: 'Удалить вложение',
		description:
			'Удалят вложение задачи. Доступно только владельцу проекта, владельцу вложения и владельцу задачи',
	})
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: 'boolean', example: true })
	@ApiForbiddenResponse({ description: 'Вы не можете удалить это вложение' })
	@ApiNotFoundResponse({ description: 'Вложение не найдено' })
	remove(
		@Param('taskId') taskId: string,
		@Param('attachmentId') attachmentId: string,
		@CurrentUser('id') userId: string
	) {
		return this.attachmentsService.remove(taskId, attachmentId, userId)
	}
}
