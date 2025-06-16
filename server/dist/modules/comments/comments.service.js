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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const comment_response_dto_1 = require("./dto/comment-response.dto");
const class_transformer_1 = require("class-transformer");
let CommentsService = class CommentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(taskId, authorId, dto) {
        const comment = await this.prisma.comment.create({
            data: {
                content: dto.content,
                taskId,
                authorId,
            },
        });
        return (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, comment, {
            excludeExtraneousValues: true,
        });
    }
    async findAllByTask(taskId) {
        const comments = await this.prisma.comment.findMany({
            where: { taskId },
            orderBy: { createdAt: 'asc' },
            include: { author: true },
        });
        return comments.map((comm) => (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, comm, {
            excludeExtraneousValues: true,
        }));
    }
    async update(id, authorId, dto) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException('Комментарий не найден');
        if (comment.authorId !== authorId)
            throw new common_1.ForbiddenException('Вы не можете изменить этот комментарий');
        const updatedComment = await this.prisma.comment.update({
            where: { id },
            data: {
                content: dto.content,
            },
        });
        return (0, class_transformer_1.plainToInstance)(comment_response_dto_1.CommentResponseDto, updatedComment, {
            excludeExtraneousValues: true,
        });
    }
    async delete(id) {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
            include: {
                task: {
                    include: {
                        project: true,
                    },
                },
            },
        });
        if (!comment)
            throw new common_1.NotFoundException('Комментарий не найден');
        await this.prisma.comment.delete({ where: { id } });
        return true;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map