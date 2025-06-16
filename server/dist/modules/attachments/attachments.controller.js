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
exports.AttachmentsController = void 0;
const common_1 = require("@nestjs/common");
const attachments_service_1 = require("./attachments.service");
const swagger_1 = require("@nestjs/swagger");
const project_member_guard_1 = require("../../common/guards/project-member.guard");
const authorization_decorator_1 = require("../auth/decorators/authorization.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const attachment_response_dto_1 = require("./dto/attachment-response.dto");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const attachments_guard_1 = require("./guards/attachments.guard");
let AttachmentsController = class AttachmentsController {
    attachmentsService;
    constructor(attachmentsService) {
        this.attachmentsService = attachmentsService;
    }
    upload(files, taskId, userId) {
        return this.attachmentsService.uploadMany(taskId, files, userId);
    }
    findAll(taskId) {
        return this.attachmentsService.findAll(taskId);
    }
    remove(taskId, attachmentId, userId) {
        return this.attachmentsService.remove(taskId, attachmentId, userId);
    }
};
exports.AttachmentsController = AttachmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Загрузить вложение',
        description: 'Загружат вложение в задачу и возвращает объект с информацией о вложении. Доступно только участником проекта',
    }),
    (0, swagger_1.ApiOkResponse)({ type: attachment_response_dto_1.AttachmentResponseDto }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    maxItems: 10,
                },
            },
            maxItems: 10,
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/attachments',
            filename: (_, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
        limits: {
            fileSize: 6 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, String]),
    __metadata("design:returntype", void 0)
], AttachmentsController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список вложений',
        description: 'Возвращает массив объектов с информацией о вложениях задачи. Доступно только участником проекта',
    }),
    (0, swagger_1.ApiOkResponse)({ type: attachment_response_dto_1.AttachmentResponseDto, isArray: true }),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttachmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':attachmentId'),
    (0, common_1.UseGuards)(project_member_guard_1.ProjectMemberGuard, attachments_guard_1.AttachmentGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить вложение',
        description: 'Удалят вложение задачи. Доступно только владельцу проекта, владельцу вложения и владельцу задачи',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: 'boolean', example: true }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Вы не можете удалить это вложение' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Вложение не найдено' }),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Param)('attachmentId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AttachmentsController.prototype, "remove", null);
exports.AttachmentsController = AttachmentsController = __decorate([
    (0, swagger_1.ApiTags)('Вложения'),
    (0, common_1.UseGuards)(project_member_guard_1.ProjectMemberGuard),
    (0, authorization_decorator_1.Authorization)(),
    (0, common_1.Controller)('projects/:projectId/tasks/:taskId/attachments'),
    __metadata("design:paramtypes", [attachments_service_1.AttachmentsService])
], AttachmentsController);
//# sourceMappingURL=attachments.controller.js.map