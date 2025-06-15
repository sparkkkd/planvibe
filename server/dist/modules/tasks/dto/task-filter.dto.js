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
exports.TaskFilterDto = exports.SortOrder = exports.SortField = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../../generated/prisma/index.js");
var SortField;
(function (SortField) {
    SortField["CREATED_AT"] = "createdAt";
    SortField["DUE_DATE"] = "dueDate";
    SortField["PRIORITY"] = "priority";
    SortField["STATUS"] = "status";
})(SortField || (exports.SortField = SortField = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
class TaskFilterDto {
    status;
    priority;
    assigneeId;
    search;
    dueDateFrom;
    dueDateTo;
    sortBy;
    sortOrder;
}
exports.TaskFilterDto = TaskFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Фильтр по статусу задачи',
        enum: prisma_1.TaskStatus,
        example: prisma_1.TaskStatus.TODO,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_1.TaskStatus, { message: 'Недопустимый статус задачи' }),
    __metadata("design:type", String)
], TaskFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Фильтр по приоритету задачи',
        enum: prisma_1.TaskPriority,
        example: prisma_1.TaskPriority.MEDIUM,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_1.TaskPriority, { message: 'Недопустимый приоритет задачи' }),
    __metadata("design:type", String)
], TaskFilterDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Фильтр по исполнителю задачи',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: 'Недопустимый идентификатор исполнителя задачи' }),
    __metadata("design:type", String)
], TaskFilterDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Фильтр по заголовку или описанию',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], TaskFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дедлайн после (дата)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaskFilterDto.prototype, "dueDateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дедлайн до (дата)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TaskFilterDto.prototype, "dueDateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Сортировка задач по полю',
        required: false,
        enum: SortField,
        example: SortField.CREATED_AT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortField, { message: 'Недопустимая сортировка задач' }),
    __metadata("design:type", String)
], TaskFilterDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Сортировка задач по порядку',
        required: false,
        enum: SortOrder,
        example: SortOrder.ASC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortOrder, { message: 'Недопустимая сортировка задач' }),
    __metadata("design:type", String)
], TaskFilterDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=task-filter.dto.js.map