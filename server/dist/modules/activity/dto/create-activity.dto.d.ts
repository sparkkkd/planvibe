import { ActivityAction, ActivityEntity } from 'generated/prisma';
export declare class CreateActivityDto {
    projectId: string;
    userId: string;
    entity: ActivityEntity;
    entityId: string;
    action: ActivityAction;
    description: string;
}
