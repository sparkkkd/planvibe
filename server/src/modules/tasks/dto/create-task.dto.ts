import { ApiProperty } from '@nestjs/swagger'
import {
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsUUID,
	MaxLength,
	MinLength,
} from 'class-validator'
import { TaskPriority } from 'generated/prisma'

export class CreateTaskDto {
	@ApiProperty({
		description: 'Название задачи',
		example: 'Задача 1',
		minLength: 6,
		maxLength: 500,
	})
	@IsNotEmpty({ message: 'Поле не может быть пустым' })
	@MinLength(6, { message: 'Минимальная длина задачи 6 символов' })
	@MaxLength(500, { message: 'Максимальная длина задачи 500 символов' })
	title: string

	@ApiProperty({
		description: 'Описание задачи. Необязательное поле',
		example: 'Создать CRUD операции для модели Tasks.',
		required: false,
	})
	@IsOptional()
	@MinLength(6, { message: 'Минимальная длина описания задачи 6 символов' })
	@MaxLength(500, {
		message: 'Максимальная длина описания задачи 500 символов',
	})
	description?: string

	@ApiProperty({
		description: 'Приоритет задачи. Необязательное поле',
		example: 'HIGH',
		required: false,
		enum: TaskPriority,
	})
	@IsOptional()
	@IsEnum(TaskPriority)
	priority?: TaskPriority

	@ApiProperty({
		description: 'Дата выполнения задачи. Необязательное поле',
		example: '2021-01-01T00:00:00.000Z',
		required: false,
	})
	@IsOptional()
	@IsDateString()
	dueDate?: string

	@ApiProperty({
		description:
			'Идентификатор пользователя, назначенного на задачу. Необязательное поле',
		example: '1',
		required: false,
	})
	@IsOptional()
	@IsUUID()
	assigneeId?: string
}
