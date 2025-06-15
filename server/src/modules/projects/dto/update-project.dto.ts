import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateProjectDto {
	@ApiProperty({
		description: 'Название проекта',
		example: 'Проект Planvibe',
		minLength: 6,
		maxLength: 100,
	})
	@MinLength(6, { message: 'Поле "Имя" не должно быть короче 6 символов' })
	@MaxLength(100, { message: 'Поле "Имя" не должно превышать 100 символов' })
	@IsOptional()
	name?: string

	@ApiProperty({
		description: 'Описание проекта',
		example: 'Платформа для управления проектами и задачами',
		maxLength: 1000,
		required: false,
	})
	@IsOptional()
	@IsString({ message: 'Поле "Описание" должно быть строкой' })
	@MaxLength(1000, {
		message: 'Поле "Описание" не должно превышать 1000 символов',
	})
	description?: string
}
