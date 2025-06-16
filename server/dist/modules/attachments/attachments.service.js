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
exports.AttachmentsService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const fs = require("fs");
const path = require("path");
const prisma_service_1 = require("../../prisma/prisma.service");
const attachment_response_dto_1 = require("./dto/attachment-response.dto");
let AttachmentsService = class AttachmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadMany(taskId, files, userId) {
        const attachments = [];
        for (const file of files) {
            const attachment = await this.prisma.attachment.create({
                data: {
                    filename: file.originalname,
                    url: file.path,
                    createdById: userId,
                    taskId,
                },
            });
            attachments.push(attachment);
        }
        return attachments.map((att) => (0, class_transformer_1.plainToInstance)(attachment_response_dto_1.AttachmentResponseDto, att, {
            excludeExtraneousValues: true,
        }));
    }
    async findAll(taskId) {
        const attachments = await this.prisma.attachment.findMany({
            where: { taskId },
        });
        return attachments.map((att) => (0, class_transformer_1.plainToInstance)(attachment_response_dto_1.AttachmentResponseDto, att, {
            excludeExtraneousValues: true,
        }));
    }
    async remove(taskId, attachmentId, userId) {
        const attachment = await this.prisma.attachment.findUnique({
            where: { id: attachmentId },
            include: {
                task: {
                    include: {
                        project: true,
                    },
                },
            },
        });
        if (!attachment || attachment.taskId !== taskId)
            throw new common_1.NotFoundException('Вложение не найдено');
        const filePath = path.join(process.cwd(), 'uploads', 'attachments', path.basename(attachment.url));
        if (fs.existsSync(filePath))
            fs.unlinkSync(filePath);
        await this.prisma.attachment.delete({ where: { id: attachmentId } });
        return true;
    }
};
exports.AttachmentsService = AttachmentsService;
exports.AttachmentsService = AttachmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttachmentsService);
//# sourceMappingURL=attachments.service.js.map