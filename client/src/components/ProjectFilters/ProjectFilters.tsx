import type { FC } from 'react'

import styles from './ProjectFilters.module.sass'
import type { SortOrder } from '../../types/project.types'
import clsx from 'clsx'
import { SearchInput } from '../SearchInput/SearchInput'
import { SortSelect } from '../SortSelect/SortSelect'

interface ProjectFiltersProps {
	className?: string
	search: string
	onSearchChange: (value: string) => void
	onSortChange: (value: SortOrder) => void
}

export const ProjectFilters: FC<ProjectFiltersProps> = ({
	className,
	search,
	onSearchChange,
	onSortChange,
}) => {
	return (
		<div className={clsx(styles.wrapper, className)}>
			<SearchInput
				placeholder='Поиск по проектам...'
				value={search}
				onChange={onSearchChange}
				className={styles.input}
			/>
			<SortSelect onChange={onSortChange} />
		</div>
	)
}
