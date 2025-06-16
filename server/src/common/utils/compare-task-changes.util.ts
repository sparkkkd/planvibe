import { Task } from 'generated/prisma'
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto'

export function compareTaskChanges(
	oldTask: Task,
	newValues: Partial<UpdateTaskDto>
) {
	const changes: string[] = []

	if (newValues.title && newValues.title !== oldTask.title) {
		changes.push(`Название: "${oldTask.title}" ⟶ "${newValues.title}"`)
	}

	if (newValues.description && newValues.description !== oldTask.description) {
		changes.push(`Описание: изменено`)
	}

	if (newValues.priority && newValues.priority !== oldTask.priority) {
		changes.push(`Приоритет: "${oldTask.priority}" ⟶ "${newValues.priority}"`)
	}
	if (newValues.status && newValues.status !== oldTask.status) {
		changes.push(`Статус: "${oldTask.status}" → "${newValues.status}"`)
	}

	if (newValues.assigneeId && newValues.assigneeId !== oldTask.assigneeId) {
		changes.push(
			`Исполнитель: "${oldTask.assigneeId}" → "${newValues.assigneeId}"`
		)
	}

	return changes
}
