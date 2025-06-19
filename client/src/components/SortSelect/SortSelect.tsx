import clsx from 'clsx'
import { useState, type FC } from 'react'
import type { SortOrder } from '../../types/project.types'

import { FaCaretDown } from 'react-icons/fa'

import styles from './SortSelect.module.sass'
import { useClickOutside } from '../../hooks/useClickOutside'
import { Card } from '../Card/Card'

interface SortSelectProps {
	className?: string
	onChange: (value: SortOrder) => void
}

export const SortSelect: FC<SortSelectProps> = ({ className, onChange }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const dropDownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

	const toggleMenu = () => setIsOpen(!isOpen)

	const handleSort = (value: SortOrder) => onChange(value)

	return (
		<div className={clsx(styles.wrapper, className)} ref={dropDownRef}>
			<button
				className={clsx(styles.button, isOpen && styles.buttonActive)}
				onClick={toggleMenu}
			>
				<FaCaretDown size={30} />
				<span>Сортировать</span>
			</button>
			{isOpen && (
				<Card className={styles.menu}>
					<ul className={styles.list}>
						<li
							onClick={(e) => {
								e.stopPropagation()
								handleSort('newest')
								setIsOpen(false)
							}}
							className={styles.item}
						>
							Сначала новые
						</li>
						<li
							className={styles.item}
							onClick={(e) => {
								e.stopPropagation()
								handleSort('oldest')
								setIsOpen(false)
							}}
						>
							Сначала старые
						</li>
					</ul>
				</Card>
			)}
		</div>
	)
}
