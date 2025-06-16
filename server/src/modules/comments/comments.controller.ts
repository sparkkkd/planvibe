import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { Authorization } from '../auth/decorators/authorization.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { CreateCommentDto } from './dto/create-comment.dto'
import {
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger'
import { CommentResponseDto } from './dto/comment-response.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { CommentsGuard } from './guards/comments.guard'

@ApiTags('Комментарии')
@Authorization()
@Controller('projects/:projectId/tasks/:taskId/comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@ApiOperation({ summary: 'Создать комментарий' })
	@ApiOkResponse({ type: CommentResponseDto })
	@Post()
	create(
		@Param('taskId') taskId: string,
		@CurrentUser('id') userId: string,
		@Body() dto: CreateCommentDto
	) {
		return this.commentsService.create(taskId, userId, dto)
	}

	@Get()
	@ApiOperation({ summary: 'Получить комментарии к задаче' })
	@ApiOkResponse({ type: CommentResponseDto })
	findAllByTask(@Param('taskId') taskId: string) {
		return this.commentsService.findAllByTask(taskId)
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Редактировать комментарий' })
	@ApiOkResponse({ type: CommentResponseDto })
	update(
		@Param('id') id: string,
		@CurrentUser('id') userId: string,
		@Body() dto: UpdateCommentDto
	) {
		return this.commentsService.update(id, userId, dto)
	}

	@Delete(':id')
	@UseGuards(CommentsGuard)
	@ApiOperation({
		summary: 'Удалить комментарий',
		description: 'Доступ только для владельца проекта и автора комментария',
	})
	@ApiOkResponse({ type: 'boolean', example: true })
	@ApiForbiddenResponse({
		description: 'У вас нет прав для удаления этого комментария',
	})
	@ApiNotFoundResponse({ description: 'Комментарий не найден' })
	delete(@Param('id') id: string) {
		return this.commentsService.delete(id)
	}
}
