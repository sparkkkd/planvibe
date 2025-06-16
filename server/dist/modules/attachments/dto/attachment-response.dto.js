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
exports.AttachmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class AttachmentResponseDto {
    id;
    filename;
    url;
    createdById;
    taskId;
    createdAt;
    updatedAt;
}
exports.AttachmentResponseDto = AttachmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Идентификатор вложения', example: '1' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Имя файла', example: 'file.png' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "filename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Путь до файла',
        example: 'somefolder/folder/file.png',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Идентификатор создателя вложения',
        example: '1',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Идентификатор задачи',
        example: '1',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата создания вложения',
        example: '2021-01-01T00:00:00.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AttachmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Дата обновления вложения',
        example: '2021-01-01T00:00:00.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AttachmentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=attachment-response.dto.js.map