import type { FC } from 'react'

import styles from './UserDropDown.module.sass'
import clsx from 'clsx'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice/authSlice'
import { useLogoutMutation } from '../../store/slices/authApi/authApi'
import { useNavigate } from 'react-router-dom'

interface UserDropDownProps {
	className?: string
	setIsOpen: (value: boolean) => void
}

export const UserDropDown: FC<UserDropDownProps> = ({
	className,
	setIsOpen,
}) => {
	const dropDownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))
	const dispatch = useAppDispatch()
	const [logoutMutation, { isLoading, error }] = useLogoutMutation()

	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await logoutMutation().unwrap()

			if (!isLoading) navigate('/intro')

			dispatch(logout())
		} catch (err) {
			console.error(error)
		}
	}

	return (
		<div className={clsx(styles.wrapper, className)} ref={dropDownRef}>
			<ul className={styles.list}>
				<li
					className={styles.item}
					onClick={(e) => {
						e.stopPropagation()
						setIsOpen(false)
						handleLogout()
					}}
				>
					Выйти из аккаунта
				</li>
			</ul>
		</div>
	)
}
