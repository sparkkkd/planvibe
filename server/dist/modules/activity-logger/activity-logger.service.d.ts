import { ActivityService } from '../activity/activity.service';
import { ActivityAction, ActivityEntity } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ActivityLoggerService {
    private readonly activityService;
    private readonly prisma;
    constructor(activityService: ActivityService, prisma: PrismaService);
    log(params: {
        userId: string;
        projectId: string;
        entity: ActivityEntity;
        entityId: string;
        action: ActivityAction;
        description: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        entity: import("generated/prisma").$Enums.ActivityEntity;
        entityId: string;
        action: import("generated/prisma").$Enums.ActivityAction;
        description: string;
        projectId: string;
        userId: string;
    }>;
}
