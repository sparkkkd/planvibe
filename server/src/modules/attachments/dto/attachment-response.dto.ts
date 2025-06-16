import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class AttachmentResponseDto {
	@ApiProperty({ description: 'Идентификатор вложения', example: '1' })
	@Expose()
	id: string

	@ApiProperty({ description: 'Имя файла', example: 'file.png' })
	@Expose()
	filename: string

	@ApiProperty({
		description: 'Путь до файла',
		example: 'somefolder/folder/file.png',
	})
	@Expose()
	url: string

	@ApiProperty({
		description: 'Идентификатор создателя вложения',
		example: '1',
	})
	@Expose()
	createdById: string

	@ApiProperty({
		description: 'Идентификатор задачи',
		example: '1',
	})
	@Expose()
	taskId: string

	@ApiProperty({
		description: 'Дата создания вложения',
		example: '2021-01-01T00:00:00.000Z',
	})
	@Expose()
	createdAt: Date

	@ApiProperty({
		description: 'Дата обновления вложения',
		example: '2021-01-01T00:00:00.000Z',
	})
	@Expose()
	updatedAt: Date
}
