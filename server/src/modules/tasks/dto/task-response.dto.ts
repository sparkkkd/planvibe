import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { TaskPriority, TaskStatus } from 'generated/prisma'

export class TaskResponseDto {
	@ApiProperty({ description: 'Идентификатор задачи', example: 1 })
	@Expose()
	id: string

	@ApiProperty({
		description: 'Название задачи',
		example: 'Задача 1',
		minLength: 6,
		maxLength: 500,
	})
	@Expose()
	title: string

	@ApiProperty({
		description: 'Описание задачи',
		example: 'Создать CRUD операции для модели Tasks',
		required: false,
	})
	@Expose()
	description: string

	@ApiProperty({
		description: 'Статус задачи',
		example: 'DONE',
		enum: TaskStatus,
	})
	@Expose()
	status: TaskStatus

	@ApiProperty({
		description: 'Приоритет задачи.',
		example: 'HIGH',
		enum: TaskPriority,
	})
	@Expose()
	priority: TaskPriority

	@ApiProperty({
		description: 'Дата выполнения задачи. Необязательное поле',
		example: '2021-01-01T00:00:00.000Z',
		required: false,
	})
	@Expose()
	dueDate?: Date

	@ApiProperty({
		description: 'Дата создания задачи.',
		example: '2021-01-01T00:00:00.000Z',
	})
	@Expose()
	createdAt: Date

	@ApiProperty({
		description: 'Дата обновления задачи.',
		example: '2021-01-01T00:00:00.000Z',
	})
	@Expose()
	updatedAt: Date

	@ApiProperty({
		description:
			'Идентификатор пользователя, назначенного на задачу. Необязательное поле.',
		example: '1',
		required: false,
	})
	@Expose()
	assignedId?: string

	@ApiProperty({
		description: 'Идентификатор проекта, которому прикреплена задача.',
		example: '1',
	})
	@Expose()
	projectId: string

	@ApiProperty({
		description: 'Идентификатор пользователя, создавшего задачу.',
		example: '1',
	})
	@Expose()
	createdById: string
}
