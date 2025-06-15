import { TaskPriority, TaskStatus } from 'generated/prisma';
export declare enum SortField {
    CREATED_AT = "createdAt",
    DUE_DATE = "dueDate",
    PRIORITY = "priority",
    STATUS = "status"
}
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare class TaskFilterDto {
    status?: TaskStatus;
    priority?: TaskPriority;
    assigneeId?: string;
    search?: string;
    dueDateFrom?: string;
    dueDateTo?: string;
    sortBy?: SortField;
    sortOrder?: SortOrder;
}
