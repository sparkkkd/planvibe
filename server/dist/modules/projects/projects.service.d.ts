import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toProjectResponseDto;
    private buildWhereCondition;
    private buildOrderByCondition;
    create(userId: string, dto: CreateProjectDto): Promise<ProjectResponseDto>;
    getProjectById(projectId: string, userId: string): Promise<ProjectResponseDto>;
    getProjectsForUser(userId: string, filters?: GetProjectsDto): Promise<ProjectResponseDto[]>;
    updateProject(projectId: string, userId: string, dto: UpdateProjectDto): Promise<ProjectResponseDto>;
    deleteProject(projectId: string, userId: string): Promise<boolean>;
}
