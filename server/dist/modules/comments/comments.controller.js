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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const authorization_decorator_1 = require("../auth/decorators/authorization.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const swagger_1 = require("@nestjs/swagger");
const comment_response_dto_1 = require("./dto/comment-response.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const comments_guard_1 = require("./guards/comments.guard");
let CommentsController = class CommentsController {
    commentsService;
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    create(taskId, userId, dto) {
        return this.commentsService.create(taskId, userId, dto);
    }
    findAllByTask(taskId) {
        return this.commentsService.findAllByTask(taskId);
    }
    update(id, userId, dto) {
        return this.commentsService.update(id, userId, dto);
    }
    delete(id) {
        return this.commentsService.delete(id);
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создать комментарий' }),
    (0, swagger_1.ApiOkResponse)({ type: comment_response_dto_1.CommentResponseDto }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить комментарии к задаче' }),
    (0, swagger_1.ApiOkResponse)({ type: comment_response_dto_1.CommentResponseDto }),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findAllByTask", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Редактировать комментарий' }),
    (0, swagger_1.ApiOkResponse)({ type: comment_response_dto_1.CommentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(comments_guard_1.CommentsGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Удалить комментарий',
        description: 'Доступ только для владельца проекта и автора комментария',
    }),
    (0, swagger_1.ApiOkResponse)({ type: 'boolean', example: true }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'У вас нет прав для удаления этого комментария',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Комментарий не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "delete", null);
exports.CommentsController = CommentsController = __decorate([
    (0, swagger_1.ApiTags)('Комментарии'),
    (0, authorization_decorator_1.Authorization)(),
    (0, common_1.Controller)('projects/:projectId/tasks/:taskId/comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map