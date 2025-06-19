import clsx from 'clsx'
import type { FC } from 'react'
import type { ITask } from '../../types/tasks.types'

import { Card } from '../Card/Card'

import styles from './ProjectCard.module.sass'
import type { IProjectResponse } from '../../types/project.types'
import { LinkTo } from '../Link/Link'

interface ProjectCardProps {
	className?: string
	project: IProjectResponse
}

export const ProjectCard: FC<ProjectCardProps> = ({ className, project }) => {
	const tasksLength = project.tasks.length
	const doneTasksLength = project.tasks.filter(
		(task: ITask) => task.status === 2
	).length

	return (
		<Card className={clsx(className, styles.card)}>
			<h4 className={styles.title}>{project.name}</h4>

			{project.description ? (
				<span className={styles.description}>{project.description}</span>
			) : (
				<span className={styles.description}>Нет описания</span>
			)}

			<div className={styles.info}>
				{tasksLength === 0 ? (
					<span>Нет задач</span>
				) : (
					<span>
						{doneTasksLength}/{tasksLength} Задач
					</span>
				)}
				<span>{project.members.length} Участников</span>
			</div>

			<LinkTo className={styles.button} to={`/projects/${project.id}`}>
				Перейти к проекту
			</LinkTo>
		</Card>
	)
}
