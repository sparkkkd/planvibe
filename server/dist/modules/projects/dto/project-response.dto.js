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
exports.ProjectResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class ProjectResponseDto {
    id;
    name;
    description;
    ownerId;
    members;
    tasks;
    createdAt;
    updatedAt;
}
exports.ProjectResponseDto = ProjectResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Идентификатор проекта', example: 1 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProjectResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Название проекта', example: 'Planvibe' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProjectResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Описание проекта',
        example: 'Платформа для управления проектами и задачами',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProjectResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Идентификатор владельца проекта', example: 1 }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProjectResponseDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Участники проекта' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ProjectResponseDto.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Задачи проекта' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ProjectResponseDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата создания проекта',
        example: '2021-01-01T00:00:00.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata("design:type", Date)
], ProjectResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата обновления проекта',
        example: '2021-01-01T00:00:00.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata("design:type", Date)
], ProjectResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=project-response.dto.js.map