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
exports.TaskResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const prisma_1 = require("../../../../generated/prisma/index.js");
class TaskResponseDto {
    id;
    title;
    description;
    status;
    priority;
    dueDate;
    createdAt;
    updatedAt;
    assignedId;
    projectId;
    createdById;
}
exports.TaskResponseDto = TaskResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Идентификатор задачи', example: 1 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название задачи',
        example: 'Задача 1',
        minLength: 6,
        maxLength: 500,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Описание задачи',
        example: 'Создать CRUD операции для модели Tasks',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Статус задачи',
        example: 'DONE',
        enum: prisma_1.TaskStatus,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Приоритет задачи.',
        example: 'HIGH',
        enum: prisma_1.TaskPriority,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата выполнения задачи. Необязательное поле',
        example: '2021-01-01T00:00:00.000Z',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], TaskResponseDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата создания задачи.',
        example: '2021-01-01T00:00:00.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], TaskResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата обновления задачи.',
        example: '2021-01-01T00:00:00.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], TaskResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Идентификатор пользователя, назначенного на задачу. Необязательное поле.',
        example: '1',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "assignedId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Идентификатор проекта, которому прикреплена задача.',
        example: '1',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Идентификатор пользователя, создавшего задачу.',
        example: '1',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "createdById", void 0);
//# sourceMappingURL=task-response.dto.js.map