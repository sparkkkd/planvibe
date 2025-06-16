import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(taskId: string, authorId: string, dto: CreateCommentDto): Promise<CommentResponseDto>;
    findAllByTask(taskId: string): Promise<CommentResponseDto[]>;
    update(id: string, authorId: string, dto: UpdateCommentDto): Promise<CommentResponseDto>;
    delete(id: string): Promise<boolean>;
}
