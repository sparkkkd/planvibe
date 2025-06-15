import { ApiProperty } from '@nestjs/swagger'
import {
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator'
import { TaskPriority, TaskStatus } from 'generated/prisma'

export class UpdateTaskDto {
	@ApiProperty({
		description: 'Название задачи. Необязательное поле.',
		example: 'Задача 1',
		minLength: 6,
		maxLength: 500,
		required: false,
	})
	@IsOptional()
	@IsString()
	@IsNotEmpty({ message: 'Поле не может быть пустым' })
	@MinLength(6, { message: 'Минимальная длина задачи 6 символов' })
	@MaxLength(500, { message: 'Максимальная длина задачи 500 символов' })
	title?: string

	@ApiProperty({
		description: 'Описание задачи. Необязательное поле.',
		example: 'Создать CRUD операции для модели Tasks.',
		required: false,
	})
	@IsOptional()
	@MinLength(6, { message: 'Минимальная длина описания задачи 6 символов.' })
	@MaxLength(500, {
		message: 'Максимальная длина описания задачи 500 символов.',
	})
	description?: string

	@ApiProperty({
		description: 'Статус задачи. Необязательное поле.',
		example: 'TODO',
		required: false,
		enum: TaskStatus,
	})
	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus

	@ApiProperty({
		description: 'Приоритет задачи. Необязательное поле.',
		example: 'HIGH',
		required: false,
		enum: TaskPriority,
	})
	@IsOptional()
	@IsEnum(TaskPriority)
	priority?: TaskPriority

	@ApiProperty({
		description:
			'Уникальый идентификатор исполнителя задачи. Необязательное поле.',
		example: '1',
		required: false,
	})
	@IsOptional()
	@IsString()
	assigneeId?: string

	@ApiProperty({
		description: 'Дедлайн задачи. Необязательное поле.',
		example: '2021-01-01T00:00:00.000Z',
		required: false,
	})
	@IsOptional()
	@IsDateString()
	dueDate?: string
}
