import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class CommentResponseDto {
	@ApiProperty({ description: 'Идентификатор комментария', example: 1 })
	@Expose()
	id: string

	@ApiProperty({
		description: 'Текст комментария',
		example: 'Привет, это комментарий',
	})
	@Expose()
	content: string

	@ApiProperty({
		description: 'Идентификатор автора комментария',
		example: 1,
	})
	@Expose()
	authorId: string

	@ApiProperty({
		description: 'Дата создания комментария',
		example: '2021-01-01T00:00:00.000Z',
	})
	@Expose()
	createdAt: Date

	@ApiProperty({
		description: 'Дата обновления комментария',
		example: '2021-01-01T00:00:00.000Z',
	})
	@Expose()
	updatedAt: Date
}
