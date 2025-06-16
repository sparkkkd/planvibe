import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { ProjectMemberGuard } from '../../common/guards/project-member.guard'

@Module({
	controllers: [TasksController],
	providers: [TasksService, ProjectMemberGuard],
})
export class TasksModule {}
