import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { Project } from 'generated/prisma'
import { ProjectResponseDto } from './dto/project-response.dto'
import { plainToInstance } from 'class-transformer'
import { UpdateProjectDto } from './dto/update-project.dto'

@Injectable()
export class ProjectsService {
	constructor(private readonly prisma: PrismaService) {}

	private toProjectResponseDto(project: Project): ProjectResponseDto {
		return plainToInstance(ProjectResponseDto, project, {
			excludeExtraneousValues: true,
		})
	}

	async create(
		userId: string,
		dto: CreateProjectDto
	): Promise<ProjectResponseDto> {
		// const { name, description } = dto

		const project = await this.prisma.project.create({
			data: {
				name: dto.name,
				description: dto.description,
				ownerId: userId,
				members: {
					create: {
						userId: userId,
						role: 'OWNER',
						joinedAt: new Date(Date.now()),
					},
				},
			},
		})

		return this.toProjectResponseDto(project)
	}

	async getProjectById(projectId: string, userId: string) {
		const project = await this.prisma.project.findUnique({
			where: {
				id: projectId,
			},
			include: {
				members: true,
			},
		})

		if (!project) throw new NotFoundException('Проект не найден')

		const isMember = project.members.some((m) => m.userId === userId)

		if (!isMember)
			throw new ForbiddenException('Вы не являетесь участником проекта')

		return this.toProjectResponseDto(project)
	}

	async getProjectForUser(userId: string) {
		const projectMembers = await this.prisma.projectMember.findMany({
			where: {
				userId,
			},
			include: {
				project: true,
			},
		})

		return projectMembers.map((pm) => this.toProjectResponseDto(pm.project))
	}

	async updateProject(
		projectId: string,
		userId: string,
		dto: UpdateProjectDto
	) {
		const member = await this.prisma.projectMember.findUnique({
			where: {
				projectId_userId: { projectId, userId },
			},
		})

		if (!member || member.role !== 'OWNER')
			throw new ForbiddenException('Вы не являетесь владельцем проекта')

		const updatedProject = await this.prisma.project.update({
			where: {
				id: projectId,
			},
			data: dto,
		})

		return this.toProjectResponseDto(updatedProject)
	}

	async deleteProject(projectId: string, userId: string) {
		const project = await this.prisma.project.findFirst({
			where: {
				id: projectId,
			},
		})

		if (!project || project.ownerId !== userId)
			throw new ForbiddenException('Вы не являетесь владельцем проекта')

		await this.prisma.attachment.deleteMany({
			where: {
				task: {
					projectId,
				},
			},
		})

		await this.prisma.comment.deleteMany({
			where: {
				task: {
					projectId,
				},
			},
		})

		await this.prisma.task.deleteMany({
			where: {
				projectId,
			},
		})

		await this.prisma.projectMember.deleteMany({
			where: {
				projectId,
			},
		})

		await this.prisma.project.update({
			where: {
				id: projectId,
			},
			data: {
				members: {
					set: [],
				},
			},
		})

		await this.prisma.project.delete({
			where: {
				id: projectId,
			},
		})

		return true
	}
}
