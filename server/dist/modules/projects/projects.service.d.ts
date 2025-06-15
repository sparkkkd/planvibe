import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toProjectResponseDto;
    create(userId: string, dto: CreateProjectDto): Promise<ProjectResponseDto>;
    getProjectById(projectId: string, userId: string): Promise<ProjectResponseDto>;
    getProjectForUser(userId: string): Promise<ProjectResponseDto[]>;
    updateProject(projectId: string, userId: string, dto: UpdateProjectDto): Promise<ProjectResponseDto>;
    deleteProject(projectId: string, userId: string): Promise<boolean>;
}
