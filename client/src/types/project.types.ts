import type { ITask } from './tasks.types'

export interface IProjectResponse {
	id: string
	name: string
	description?: string | null
	ownerId: string
	members: IMembers[]
	tasks: ITask[]
	createdAt: string
	updatedAt: string
}

export interface IProjectRequest {
	name: string
	description?: string | null
}

export type SortOrder = 'newest' | 'oldest'

interface IMembers {
	projectId: string
	userId: string
	role: ProjectMemberRole
}

enum ProjectMemberRole {
	OWNER,
	MEMBER,
	MANAGER,
}
