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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const task_response_dto_1 = require("./dto/task-response.dto");
const class_transformer_1 = require("class-transformer");
const task_filter_dto_1 = require("./dto/task-filter.dto");
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    buildWhereFilters(filter) {
        const where = {};
        const { status, priority, assigneeId, dueDateFrom, dueDateTo, search } = filter;
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        if (assigneeId)
            where.assigneeId = assigneeId;
        if (dueDateFrom || dueDateTo) {
            where.dueDate = {};
            if (dueDateFrom)
                where.dueDate.gte = new Date(dueDateFrom);
            if (dueDateTo)
                where.dueDate.lte = new Date(dueDateTo);
        }
        if (search) {
            where.OR = [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        return where;
    }
    async create(projectId, dto, userId) {
        const { title, assigneeId, description, dueDate, priority } = dto;
        if (dto.assigneeId) {
            const assigneeIsMember = await this.prisma.projectMember.findFirst({
                where: {
                    projectId,
                    userId: dto.assigneeId,
                },
            });
            if (!assigneeIsMember) {
                throw new common_1.ForbiddenException('Пользователь не является участником проекта');
            }
        }
        const task = await this.prisma.task.create({
            data: {
                title,
                description,
                priority: priority ?? 'LOW',
                dueDate: dueDate ? new Date(dueDate) : undefined,
                assigneeId,
                projectId,
                createdById: userId,
            },
        });
        return (0, class_transformer_1.plainToInstance)(task_response_dto_1.TaskResponseDto, task, {
            excludeExtraneousValues: true,
        });
    }
    async getAllTasks(projectId, filter) {
        const where = {
            projectId,
            ...this.buildWhereFilters(filter),
        };
        const orderBy = filter.sortBy && filter.sortOrder
            ? { [filter.sortBy]: filter.sortOrder }
            : { createdAt: task_filter_dto_1.SortOrder.DESC };
        const tasks = await this.prisma.task.findMany({ where, orderBy });
        return (0, class_transformer_1.plainToInstance)(task_response_dto_1.TaskResponseDto, tasks, {
            excludeExtraneousValues: true,
        });
    }
    async getById(projectId, taskId) {
        const task = await this.prisma.task.findFirst({
            where: {
                id: taskId,
                projectId,
            },
        });
        if (!task)
            throw new common_1.NotFoundException('Задача не найдена');
        return (0, class_transformer_1.plainToInstance)(task_response_dto_1.TaskResponseDto, task, {
            excludeExtraneousValues: true,
        });
    }
    async update(projectId, taskId, dto, userId) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { project: true },
        });
        if (!task || task.projectId !== projectId)
            throw new common_1.NotFoundException('Задача не найдена');
        const isAuthor = task.createdById === userId;
        const isAssignee = task.assigneeId === userId;
        const isProjectOwner = task.project.ownerId === userId;
        if (isAssignee && !isAuthor && isProjectOwner) {
            const allowedFields = ['status'];
            const hasDisallowedFields = Object.keys(dto).some((key) => !allowedFields.includes(key));
            if (hasDisallowedFields)
                throw new common_1.ForbiddenException('Исполнитель может изменять только статус задачи');
        }
        if (!isAuthor && !isProjectOwner && isAssignee)
            throw new common_1.ForbiddenException('Вы не можете редактировать эту задачу');
        const updatedTask = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                ...dto,
            },
        });
        return (0, class_transformer_1.plainToInstance)(task_response_dto_1.TaskResponseDto, updatedTask, {
            excludeExtraneousValues: true,
        });
    }
    async remove(projectId, taskId, userId) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { project: true },
        });
        if (!task || task.projectId !== projectId)
            throw new common_1.NotFoundException('Задача не найдена');
        const isAuthor = task.createdById === userId;
        const isProjectOwner = task.project.ownerId === userId;
        if (!isAuthor && !isProjectOwner)
            throw new common_1.ForbiddenException('Вы не можете удалить эту задачу');
        await this.prisma.$transaction([
            this.prisma.comment.deleteMany({ where: { taskId } }),
            this.prisma.attachment.deleteMany({ where: { taskId } }),
            this.prisma.task.delete({ where: { id: taskId } }),
        ]);
        return true;
    }
    async updateStatus(projectId, taskId, dto, userId) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { project: true },
        });
        if (!task || task.projectId !== projectId)
            throw new common_1.NotFoundException('Задача не найдена');
        const isOwner = task.project.ownerId === userId;
        const isAssignee = task.assigneeId === userId;
        if (!isOwner && !isAssignee)
            throw new common_1.ForbiddenException('Вы не можете изменить статус этой задачи');
        await this.prisma.task.update({
            where: { id: taskId },
            data: { status: dto.status },
        });
        return true;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map