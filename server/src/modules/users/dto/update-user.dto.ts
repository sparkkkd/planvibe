import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class UpdateUserDto {
	@ApiProperty({
		description: 'Идентификатор пользователя',
		example: 1,
	})
	@IsNotEmpty({ message: 'Поле не может быть пустым' })
	id: string

	@ApiProperty({
		description: 'Имя пользователя',
		example: 'John Doe',
		minLength: 5,
		maxLength: 40,
	})
	@IsNotEmpty({ message: 'Имя не может быть пустым' })
	@MaxLength(40, { message: 'Максимальная длина имени 40 символов' })
	@MinLength(5, { message: 'Минимальная длина имени 5 символов' })
	name: string
}
