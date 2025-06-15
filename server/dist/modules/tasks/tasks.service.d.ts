import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildWhereFilters;
    create(projectId: string, dto: CreateTaskDto, userId: string): Promise<TaskResponseDto>;
    getAllTasks(projectId: string, filter: TaskFilterDto): Promise<TaskResponseDto[]>;
    getById(projectId: string, taskId: string): Promise<TaskResponseDto>;
    update(projectId: string, taskId: string, dto: UpdateTaskDto, userId: string): Promise<TaskResponseDto>;
    remove(projectId: string, taskId: string, userId: string): Promise<boolean>;
    updateStatus(projectId: string, taskId: string, dto: UpdateTaskStatusDto, userId: string): Promise<boolean>;
}
