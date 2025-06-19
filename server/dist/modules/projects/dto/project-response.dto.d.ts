import { ProjectMember, Task } from 'generated/prisma';
export declare class ProjectResponseDto {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    members: ProjectMember[];
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
}
