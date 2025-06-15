import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
	@ApiProperty({
		description: 'Почта пользователя',
		example: 'johndoe@gmail.com',
	})
	@IsNotEmpty({ message: 'Почта не может быть пустым' })
	@IsEmail({}, { message: 'Неверный формат почты' })
	email: string

	@IsNotEmpty({ message: 'Поле не может быть пустым' })
	@MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
	@MaxLength(40, { message: 'Максимальная длина пароля 40 символов' })
	password: string
}
