import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(taskId: string, userId: string, dto: CreateCommentDto): Promise<CommentResponseDto>;
    findAllByTask(taskId: string): Promise<CommentResponseDto[]>;
    update(id: string, userId: string, dto: UpdateCommentDto): Promise<CommentResponseDto>;
    delete(id: string): Promise<boolean>;
}
