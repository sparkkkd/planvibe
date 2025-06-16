import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateActivityDto } from './dto/create-activity.dto'

@Injectable()
export class ActivityService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateActivityDto) {
		return this.prisma.activity.create({ data: dto })
	}
}
