import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	private readonly SALT_ROUNDS = 10

	constructor(private readonly prisma: PrismaService) {}

	async createUser(dto: CreateUserDto) {
		const { email, name, password } = dto

		const existing = await this.prisma.user.findUnique({
			where: { email: dto.email },
		})

		if (existing)
			throw new ConflictException('Пользователь уже зарегистрирован')

		const hashedPassword = await bcrypt.hash(dto.password, this.SALT_ROUNDS)

		const user = await this.prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				createdAt: true,
			},
		})

		return user
	}
}
