import type { FC } from 'react'

import styles from './ProjectsPage.module.sass'
import clsx from 'clsx'
import { Header } from '../../modules/Header/Header'
import { Container } from '../../components/Container/Container'
import { ProjectFilters } from '../../components/ProjectFilters/ProjectFilters'
import { useSearchParams } from 'react-router-dom'
import type { SortOrder } from '../../types/project.types'
import { useFetchUserProjectsQuery } from '../../store/slices/projectsApi/projectsApi'
import { ProjectsList } from '../../components/ProjectsList/ProjectsList'

interface ProjectPageProps {
	className?: string
}

export const ProjectsPage: FC<ProjectPageProps> = ({ className }) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const search = searchParams.get('search') || ''
	const sortBy = (searchParams.get('sortBy') as SortOrder) || 'newest'

	const handleSearchChange = (value: string) => {
		const params = new URLSearchParams(searchParams)

		if (value) {
			params.set('search', value)
		} else {
			params.delete('search')
		}

		setSearchParams(params)
	}

	const handleSortChange = (value: SortOrder) => {
		const params = new URLSearchParams(searchParams)
		params.set('sortBy', value)
		setSearchParams(params)
	}

	const {
		data: projects,
		isLoading,
		isError,
	} = useFetchUserProjectsQuery({ search, sortBy })

	return (
		<div className={clsx(styles.wrapper, className)}>
			<Header />
			<Container>
				<ProjectFilters
					search={search}
					onSearchChange={handleSearchChange}
					onSortChange={handleSortChange}
				/>
				{projects && (
					<ProjectsList className={styles.projects} projects={projects} />
				)}
			</Container>
		</div>
	)
}
