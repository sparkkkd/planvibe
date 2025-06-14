import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	MaxLength,
	MinLength,
} from 'class-validator'

export class CreateUserDto {
	@IsEmail({}, { message: 'Неверный формат почты' })
	email: string

	@IsNotEmpty({ message: 'Поле не может быть пустым' })
	@MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
	password: string

	@IsNotEmpty({ message: 'Имя не может быть пустым' })
	@MaxLength(40, { message: 'Максимальная длина имени 40 символов' })
	name: string
}
