import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { Role } from 'generated/prisma'

export class UserDto {
	@ApiProperty({
		description: 'Идентификатор пользователя',
		example: 1,
	})
	@Expose()
	id: string

	@ApiProperty({
		description: 'Почта пользователя',
		example: 'johndoe@gmail.com',
	})
	@Expose()
	email: string

	@ApiProperty({
		description: 'Отображаемое имя пользователя',
		example: 'John Doe',
	})
	@Expose()
	name: string

	@ApiProperty({
		description: 'Роль пользователя',
		example: 'USER',
	})
	@Expose()
	role: Role

	@Exclude()
	password: string

	@ApiProperty({
		description: 'Дата регистрации пользователя',
		example: '2025-06-14T22:03:51.171Z',
	})
	@Expose()
	createdAt: Date

	@ApiProperty({
		description: 'Дата обновления профиля пользователя',
		example: '2025-06-14T22:03:51.171Z',
	})
	@Expose()
	updatedAt: Date
}
