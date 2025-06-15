"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const project_response_dto_1 = require("./dto/project-response.dto");
const class_transformer_1 = require("class-transformer");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toProjectResponseDto(project) {
        return (0, class_transformer_1.plainToInstance)(project_response_dto_1.ProjectResponseDto, project, {
            excludeExtraneousValues: true,
        });
    }
    async create(userId, dto) {
        const project = await this.prisma.project.create({
            data: {
                name: dto.name,
                description: dto.description,
                ownerId: userId,
                members: {
                    create: {
                        userId: userId,
                        role: 'OWNER',
                        joinedAt: new Date(Date.now()),
                    },
                },
            },
        });
        return this.toProjectResponseDto(project);
    }
    async getProjectById(projectId, userId) {
        const project = await this.prisma.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                members: true,
            },
        });
        if (!project)
            throw new common_1.NotFoundException('Проект не найден');
        const isMember = project.members.some((m) => m.userId === userId);
        if (!isMember)
            throw new common_1.ForbiddenException('Вы не являетесь участником проекта');
        return this.toProjectResponseDto(project);
    }
    async getProjectForUser(userId) {
        const projectMembers = await this.prisma.projectMember.findMany({
            where: {
                userId,
            },
            include: {
                project: true,
            },
        });
        return projectMembers.map((pm) => this.toProjectResponseDto(pm.project));
    }
    async updateProject(projectId, userId, dto) {
        const member = await this.prisma.projectMember.findUnique({
            where: {
                projectId_userId: { projectId, userId },
            },
        });
        if (!member || member.role !== 'OWNER')
            throw new common_1.ForbiddenException('Вы не являетесь владельцем проекта');
        const updatedProject = await this.prisma.project.update({
            where: {
                id: projectId,
            },
            data: dto,
        });
        return this.toProjectResponseDto(updatedProject);
    }
    async deleteProject(projectId, userId) {
        const project = await this.prisma.project.findFirst({
            where: {
                id: projectId,
            },
        });
        if (!project || project.ownerId !== userId)
            throw new common_1.ForbiddenException('Вы не являетесь владельцем проекта');
        await this.prisma.attachment.deleteMany({
            where: {
                task: {
                    projectId,
                },
            },
        });
        await this.prisma.comment.deleteMany({
            where: {
                task: {
                    projectId,
                },
            },
        });
        await this.prisma.task.deleteMany({
            where: {
                projectId,
            },
        });
        await this.prisma.projectMember.deleteMany({
            where: {
                projectId,
            },
        });
        await this.prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                members: {
                    set: [],
                },
            },
        });
        await this.prisma.project.delete({
            where: {
                id: projectId,
            },
        });
        return true;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map