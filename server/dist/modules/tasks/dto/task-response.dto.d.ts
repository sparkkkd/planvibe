import { TaskPriority, TaskStatus } from 'generated/prisma';
export declare class TaskResponseDto {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    assignedId?: string;
    projectId: string;
    createdById: string;
}
