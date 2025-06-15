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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUserDto {
    id;
    name;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Идентификатор пользователя',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Поле не может быть пустым' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Имя пользователя',
        example: 'John Doe',
        minLength: 5,
        maxLength: 40,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Имя не может быть пустым' }),
    (0, class_validator_1.MaxLength)(40, { message: 'Максимальная длина имени 40 символов' }),
    (0, class_validator_1.MinLength)(5, { message: 'Минимальная длина имени 5 символов' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
//# sourceMappingURL=update-user.dto.js.map