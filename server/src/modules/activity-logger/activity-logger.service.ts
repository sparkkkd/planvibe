import { Injectable } from '@nestjs/common'
import { ActivityService } from '../activity/activity.service'
import { ActivityAction, ActivityEntity } from 'generated/prisma'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ActivityLoggerService {
	constructor(
		private readonly activityService: ActivityService,
		private readonly prisma: PrismaService
	) {}

	async log(params: {
		userId: string
		projectId: string
		entity: ActivityEntity
		entityId: string
		action: ActivityAction
		description: string
	}) {
		const user = await this.prisma.user.findUnique({
			where: { id: params.userId },
			select: { name: true },
		})

		const fullDescription = `${user?.name ?? '?'} — ${params.description}`
		return this.activityService.create({
			...params,
			description: fullDescription,
		})
	}
}
