import type { FC } from 'react'

import styles from './ProjectsPage.module.sass'
import clsx from 'clsx'

interface ProjectPageProps {
	className?: string
}

export const ProjectsPage: FC<ProjectPageProps> = ({ className }) => {
	return <div className={clsx(styles.wrapper, className)}>ProjectPage</div>
}
