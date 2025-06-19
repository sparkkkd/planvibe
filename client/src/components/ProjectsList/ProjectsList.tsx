import clsx from 'clsx'

import type { FC } from 'react'
import type { IProjectResponse } from '../../types/project.types'

import { ProjectCard } from '../ProjectCard/ProjectCard'

import styles from './ProjectsList.module.sass'

interface ProjectsListProps {
	className?: string
	projects: IProjectResponse[]
}

export const ProjectsList: FC<ProjectsListProps> = ({
	className,
	projects,
}) => {
	return (
		<div className={clsx(styles.wrapper, className)}>
			{projects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</div>
	)
}
