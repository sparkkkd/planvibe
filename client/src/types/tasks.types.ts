export interface ITask {
	id: string
	title: string
	description?: string | null
	status: TaskStatus
	priority: TaskPriority
	dueDate: Date
	assigneeId: string
	createdById: string
	projectId: string
	createdAt: string
	updatedAt: string
}

enum TaskStatus {
	TODO,
	IN_PROGRESS,
	DONE,
}

enum TaskPriority {
	LOW,
	MEDIUM,
	HIGH,
	CRITICAL,
}
