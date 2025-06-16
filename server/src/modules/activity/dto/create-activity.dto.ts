import { IsEnum, IsString, IsUUID } from 'class-validator'
import { ActivityAction, ActivityEntity } from 'generated/prisma'

export class CreateActivityDto {
	@IsUUID()
	projectId: string

	@IsUUID()
	userId: string

	@IsEnum(ActivityEntity)
	entity: ActivityEntity

	@IsString()
	entityId: string

	@IsEnum(ActivityAction)
	action: ActivityAction

	@IsString()
	description: string
}
