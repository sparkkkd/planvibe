import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	private readonly SALT_ROUNDS = 10

	constructor(private readonly prisma: PrismaService) {}

	async findByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		})

		return user
	}

	async updateUser(dto: UpdateUserDto) {
		const { id, name } = dto

		const user = await this.prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
			},
		})

		return user.name
	}
}
