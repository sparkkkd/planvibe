import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateCommentDto {
	@ApiProperty({
		description: 'Текст комментария',
		example: 'Привет, это комментарий',
	})
	@IsString()
	@IsNotEmpty({ message: 'Комментарий не может быть пустым' })
	@MaxLength(1000, { message: 'Поле не должно превышать 1000 символов' })
	content: string
}
