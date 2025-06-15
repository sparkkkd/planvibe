import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'

export class ProjectResponseDto {
	@ApiProperty({ description: 'Идентификатор проекта', example: 1 })
	@Expose()
	id: string

	@ApiProperty({ description: 'Название проекта', example: 'Planvibe' })
	@Expose()
	name: string

	@ApiProperty({
		description: 'Описание проекта',
		example: 'Платформа для управления проектами и задачами',
		required: false,
	})
	@Expose()
	description?: string

	@ApiProperty({ description: 'Идентификатор владельца проекта', example: 1 })
	@Expose()
	ownerId: string

	@ApiProperty({
		description: 'Дата создания проекта',
		example: '2021-01-01T00:00:00.000Z',
	})
	@Expose()
	@Transform(({ value }) => new Date(value), { toClassOnly: true })
	createdAt: Date

	@ApiProperty({
		description: 'Дата обновления проекта',
		example: '2021-01-01T00:00:00.000Z',
	})
	@Expose()
	@Transform(({ value }) => new Date(value), { toClassOnly: true })
	updatedAt: Date
}
