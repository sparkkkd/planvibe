import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
export declare class ActivityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateActivityDto): Promise<{
        description: string;
        id: string;
        createdAt: Date;
        projectId: string;
        userId: string;
        entity: import("generated/prisma").$Enums.ActivityEntity;
        entityId: string;
        action: import("generated/prisma").$Enums.ActivityAction;
    }>;
}
