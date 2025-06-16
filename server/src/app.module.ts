import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ProjectsModule } from './modules/projects/projects.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { AttachmentsModule } from './modules/attachments/attachments.module'
import { CommentsModule } from './modules/comments/comments.module'
import { ActivityLoggerModule } from './modules/activity-logger/activity-logger.module'
import { ActivityModule } from './modules/activity/activity.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		PrismaModule,
		UsersModule,
		AuthModule,
		ProjectsModule,
		TasksModule,
		AttachmentsModule,
		CommentsModule,
		ActivityLoggerModule,
		ActivityModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
