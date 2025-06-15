import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { TaskStatus } from 'generated/prisma'

export class UpdateTaskStatusDto {
	@ApiProperty({
		description: 'Новый статус задачи',
		enum: TaskStatus,
		example: TaskStatus.IN_PROGRESS,
	})
	@IsEnum(TaskStatus, { message: 'Недопустимый статус задачи' })
	status: TaskStatus
}
