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
exports.CreateProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProjectDto {
    name;
    description;
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Название проекта',
        example: 'Проект Planvibe',
        minLength: 6,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)({ message: 'Поле "Имя" должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Поле "Имя" не может быть пустым' }),
    (0, class_validator_1.MinLength)(6, { message: 'Поле "Имя" не должно быть короче 6 символов' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Поле "Имя" не должно превышать 100 символов' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Описание проекта',
        example: 'Платформа для управления проектами и задачами',
        maxLength: 1000,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Поле "Описание" должно быть строкой' }),
    (0, class_validator_1.MaxLength)(1000, {
        message: 'Поле "Описание" не должно превышать 1000 символов',
    }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
//# sourceMappingURL=create-project.dto.js.map