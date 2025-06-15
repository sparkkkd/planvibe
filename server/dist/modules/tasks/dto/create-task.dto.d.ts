import { TaskPriority } from 'generated/prisma';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    priority?: TaskPriority;
    dueDate?: string;
    assigneeId?: string;
}
