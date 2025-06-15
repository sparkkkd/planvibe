import { ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsDateString,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	MinLength,
} from 'class-validator'
import { TaskPriority, TaskStatus } from 'generated/prisma'

export enum SortField {
	CREATED_AT = 'createdAt',
	DUE_DATE = 'dueDate',
	PRIORITY = 'priority',
	STATUS = 'status',
}

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export class TaskFilterDto {
	@ApiPropertyOptional({
		description: 'Фильтр по статусу задачи',
		enum: TaskStatus,
		example: TaskStatus.TODO,
		required: false,
	})
	@IsOptional()
	@IsEnum(TaskStatus, { message: 'Недопустимый статус задачи' })
	status?: TaskStatus

	@ApiPropertyOptional({
		description: 'Фильтр по приоритету задачи',
		enum: TaskPriority,
		example: TaskPriority.MEDIUM,
		required: false,
	})
	@IsOptional()
	@IsEnum(TaskPriority, { message: 'Недопустимый приоритет задачи' })
	priority?: TaskPriority

	@ApiPropertyOptional({
		description: 'Фильтр по исполнителю задачи',
		required: false,
	})
	@IsOptional()
	@IsUUID(4, { message: 'Недопустимый идентификатор исполнителя задачи' })
	assigneeId?: string

	@ApiPropertyOptional({
		description: 'Фильтр по заголовку или описанию',
		required: false,
	})
	@IsOptional()
	@IsString()
	@MinLength(2)
	search?: string

	@ApiPropertyOptional({
		description: 'Дедлайн после (дата)',
		required: false,
	})
	@IsOptional()
	@IsDateString()
	dueDateFrom?: string

	@ApiPropertyOptional({
		description: 'Дедлайн до (дата)',
		required: false,
	})
	@IsOptional()
	@IsDateString()
	dueDateTo?: string

	@ApiPropertyOptional({
		description: 'Сортировка задач по полю',
		required: false,
		enum: SortField,
		example: SortField.CREATED_AT,
	})
	@IsOptional()
	@IsEnum(SortField, { message: 'Недопустимая сортировка задач' })
	sortBy?: SortField

	@ApiPropertyOptional({
		description: 'Сортировка задач по порядку',
		required: false,
		enum: SortOrder,
		example: SortOrder.ASC,
	})
	@IsOptional()
	@IsEnum(SortOrder, { message: 'Недопустимая сортировка задач' })
	sortOrder?: SortOrder
}
