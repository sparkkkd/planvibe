import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    createProject(userId: string, dto: CreateProjectDto): Promise<ProjectResponseDto>;
    getProjectsForUser(userId: string, filters: GetProjectsDto): Promise<ProjectResponseDto[]>;
    getProjectById(id: string, userId: string): Promise<ProjectResponseDto>;
    updateProject(id: string, userId: string, dto: CreateProjectDto): Promise<ProjectResponseDto>;
    deleteProject(projectId: string, userId: string): Promise<boolean>;
}
