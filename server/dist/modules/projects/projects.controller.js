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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const authorization_decorator_1 = require("../auth/decorators/authorization.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const create_project_dto_1 = require("./dto/create-project.dto");
const swagger_1 = require("@nestjs/swagger");
const project_response_dto_1 = require("./dto/project-response.dto");
let ProjectsController = class ProjectsController {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    createProject(userId, dto) {
        return this.projectsService.create(userId, dto);
    }
    getProjectsForUser(userId) {
        return this.projectsService.getProjectForUser(userId);
    }
    getProjectById(id, userId) {
        return this.projectsService.getProjectById(id, userId);
    }
    updateProject(id, userId, dto) {
        return this.projectsService.updateProject(id, userId, dto);
    }
    deleteProject(projectId, userId) {
        return this.projectsService.deleteProject(projectId, userId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создание проекта',
        description: 'Создает в базе данных проект и присваивает ему владельца',
    }),
    (0, swagger_1.ApiOkResponse)({ type: project_response_dto_1.ProjectResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Невалидные вводные данные' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение списка проектов, в которых участвует пользователь',
    }),
    (0, swagger_1.ApiOkResponse)({ type: project_response_dto_1.ProjectResponseDto, isArray: true }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProjectsForUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение проекта по id',
        description: 'Получает определенный проект по уникальному идентификатору. Не позволяет получить проект пользователю, не являющимся участником',
    }),
    (0, swagger_1.ApiOkResponse)({ type: project_response_dto_1.ProjectResponseDto, isArray: true }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Вы не являетесь участником проекта' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProjectById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновление проекта',
        description: 'Обновляет проект по уникальному идентификатору. Позволяет обновить проект только владельцу',
    }),
    (0, swagger_1.ApiOkResponse)({ type: project_response_dto_1.ProjectResponseDto }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Вы не являетесь владельцем проекта' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление проекта',
        description: 'Удаляет проект по уникальному идентификатору. Позволяет удалить проект только владельцу',
    }),
    (0, swagger_1.ApiOkResponse)({ type: 'boolean', example: true }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Вы не являетесь владельцем проекта' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "deleteProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, authorization_decorator_1.Authorization)(),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map