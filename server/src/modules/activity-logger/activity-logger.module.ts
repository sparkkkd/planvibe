import { Global, Module } from '@nestjs/common'
import { ActivityLoggerService } from './activity-logger.service'
import { ActivityService } from '../activity/activity.service'

@Global()
@Module({
	controllers: [],
	providers: [ActivityLoggerService, ActivityService],
	exports: [ActivityLoggerService],
})
export class ActivityLoggerModule {}
