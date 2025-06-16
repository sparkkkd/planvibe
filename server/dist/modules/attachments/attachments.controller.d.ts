import { AttachmentsService } from './attachments.service';
import { AttachmentResponseDto } from './dto/attachment-response.dto';
export declare class AttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: AttachmentsService);
    upload(files: Express.Multer.File[], taskId: string, userId: string): Promise<AttachmentResponseDto[]>;
    findAll(taskId: string): Promise<AttachmentResponseDto[]>;
    remove(taskId: string, attachmentId: string, userId: string): Promise<boolean>;
}
