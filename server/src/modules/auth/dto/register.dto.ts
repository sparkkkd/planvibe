import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
	@ApiProperty({
		description: 'Почта пользователя',
		example: 'johndoe@gmail.com',
	})
	@IsEmail({}, { message: 'Неверный формат почты' })
	email: string

	@ApiProperty({
		description: 'Пароль',
		example: '123456',
		minLength: 6,
		maxLength: 40,
	})
	@IsNotEmpty({ message: 'Поле не может быть пустым' })
	@MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
	@MaxLength(40, { message: 'Максимальная длина пароля 40 символов' })
	password: string

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
