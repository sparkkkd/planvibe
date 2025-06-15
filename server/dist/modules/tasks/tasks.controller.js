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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const project_member_guard_1 = require("./guards/project-member.guard");
const create_task_dto_1 = require("./dto/create-task.dto");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
const task_response_dto_1 = require("./dto/task-response.dto");
const authorization_decorator_1 = require("../auth/decorators/authorization.decorator");
const update_task_dto_1 = require("./dto/update-task.dto");
const update_task_status_dto_1 = require("./dto/update-task-status.dto");
const task_filter_dto_1 = require("./dto/task-filter.dto");
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async create(projectId, dto, userId) {
        return this.tasksService.create(projectId, dto, userId);
    }
    async getAll(projectId, filter) {
        return this.tasksService.getAllTasks(projectId, filter);
    }
    async getById(projectId, taskId) {
        return this.tasksService.getById(projectId, taskId);
    }
    async update(projectId, taskId, dto, userId) {
        return this.tasksService.update(projectId, taskId, dto, userId);
    }
    async remove(projectId, taskId, userId) {
        await this.tasksService.remove(projectId, taskId, userId);
    }
    async updateStatus(projectId, taskId, dto, userId) {
        await this.tasksService.updateStatus(projectId, taskId, dto, userId);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(project_member_guard_1.ProjectMemberGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Создание задачи',
        description: 'Доступно только для участников проекта. Создает задачу и возвращает ее в ответ',
    }),
    (0, swagger_1.ApiOkResponse)({ type: task_response_dto_1.TaskResponseDto }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Пользователь не является участником проекта',
    }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_task_dto_1.CreateTaskDto, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(project_member_guard_1.ProjectMemberGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение списка задач по проекту',
        description: 'Доступно только для участников проекта. Возвращает массив задач для данного проекта',
    }),
    (0, swagger_1.ApiOkResponse)({ type: task_response_dto_1.TaskResponseDto }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_filter_dto_1.TaskFilterDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':taskId'),
    (0, common_1.UseGuards)(project_member_guard_1.ProjectMemberGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение задачи по проекту',
        description: 'Доступно только для участников проекта. Возвращает объект с задачой',
    }),
    (0, swagger_1.ApiOkResponse)({ type: task_response_dto_1.TaskResponseDto }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':taskId'),
    (0, common_1.UseGuards)(project_member_guard_1.ProjectMemberGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновление задачи',
        description: 'Обновить задачу может только: создатель задачи, владелец проекта, исполнитель задачи (исполнитель может поменять только статус задачи, например из IN_PROGRESS в DONE)',
    }),
    (0, swagger_1.ApiOkResponse)({ type: task_response_dto_1.TaskResponseDto }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Исполнитель может изменять только статус задачи',
    }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_task_dto_1.UpdateTaskDto, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':taskId'),
    (0, common_1.UseGuards)(project_member_guard_1.ProjectMemberGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление задачи',
        description: 'Удалить задачу может только владелец проекта или создатель задачи',
    }),
    (0, swagger_1.ApiOkResponse)({ type: 'boolean', example: true }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Задача не найдена' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Вы не можете удалить эту задачу' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':taskId/status'),
    (0, common_1.UseGuards)(project_member_guard_1.ProjectMemberGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Изменение статуса задачи',
        description: 'Изменить статус может владелец проекта или исполнитель задачи',
    }),
    (0, swagger_1.ApiOkResponse)({ type: 'boolean', example: true }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Задача не найдена' }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Вы не можете изменить статус этой задачи',
    }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_task_status_dto_1.UpdateTaskStatusDto, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateStatus", null);
exports.TasksController = TasksController = __decorate([
    (0, authorization_decorator_1.Authorization)(),
    (0, common_1.Controller)('projects/:projectId/tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map