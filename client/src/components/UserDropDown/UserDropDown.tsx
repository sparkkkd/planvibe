import type { FC } from 'react'

import styles from './UserDropDown.module.sass'
import clsx from 'clsx'
import { useClickOutside } from '../../hooks/useClickOutside'

interface UserDropDownProps {
	className?: string
	setIsOpen: (value: boolean) => void
}

export const UserDropDown: FC<UserDropDownProps> = ({
	className,
	setIsOpen,
}) => {
	const dropDownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

	return (
		<div className={clsx(styles.wrapper, className)} ref={dropDownRef}>
			<ul className={styles.list}>
				<li
					className={styles.item}
					onClick={(e) => {
						e.stopPropagation()
						setIsOpen(false)
					}}
				>
					Выйти из аккаунта
				</li>
			</ul>
		</div>
	)
}
