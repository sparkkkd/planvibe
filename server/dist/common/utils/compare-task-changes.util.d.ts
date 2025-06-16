import { Task } from 'generated/prisma';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';
export declare function compareTaskChanges(oldTask: Task, newValues: Partial<UpdateTaskDto>): string[];
