import { PrismaService } from 'src/prisma/prisma.service';
import { AttachmentResponseDto } from './dto/attachment-response.dto';
export declare class AttachmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    uploadMany(taskId: string, files: Express.Multer.File[], userId: string): Promise<AttachmentResponseDto[]>;
    findAll(taskId: string): Promise<AttachmentResponseDto[]>;
    remove(taskId: string, attachmentId: string, userId: string): Promise<boolean>;
}
