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
exports.UpdateTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../../generated/prisma/index.js");
class UpdateTaskDto {
    title;
    description;
    status;
    priority;
    assigneeId;
    dueDate;
}
exports.UpdateTaskDto = UpdateTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название задачи. Необязательное поле.',
        example: 'Задача 1',
        minLength: 6,
        maxLength: 500,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Поле не может быть пустым' }),
    (0, class_validator_1.MinLength)(6, { message: 'Минимальная длина задачи 6 символов' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Максимальная длина задачи 500 символов' }),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Описание задачи. Необязательное поле.',
        example: 'Создать CRUD операции для модели Tasks.',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(6, { message: 'Минимальная длина описания задачи 6 символов.' }),
    (0, class_validator_1.MaxLength)(500, {
        message: 'Максимальная длина описания задачи 500 символов.',
    }),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Статус задачи. Необязательное поле.',
        example: 'TODO',
        required: false,
        enum: prisma_1.TaskStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_1.TaskStatus),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Приоритет задачи. Необязательное поле.',
        example: 'HIGH',
        required: false,
        enum: prisma_1.TaskPriority,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_1.TaskPriority),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Уникальый идентификатор исполнителя задачи. Необязательное поле.',
        example: '1',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дедлайн задачи. Необязательное поле.',
        example: '2021-01-01T00:00:00.000Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "dueDate", void 0);
//# sourceMappingURL=update-task.dto.js.map