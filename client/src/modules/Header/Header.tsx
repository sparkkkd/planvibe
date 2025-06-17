import type { FC } from 'react'
import clsx from 'clsx'

import { useAppSelector } from '../../store/hooks'

import { IoIosNotificationsOutline } from 'react-icons/io'
import { CiCirclePlus } from 'react-icons/ci'

import { Logo } from '../../components/Logo/Logo'
import { UserAvatar } from '../../components/UserAvatar/UserAvatar'

import styles from './Header.module.sass'

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	const { isAuthenticated, user } = useAppSelector((state) => state.authSlice)

	return (
		<header className={clsx(styles.header, className)}>
			<div className={styles.left}>
				<Logo />
			</div>

			<div className={styles.right}>
				{!isAuthenticated && (
					<a href='/auth'>
						<span className={styles.auth}>Войти / Зарегистрироваться</span>
					</a>
				)}

				{isAuthenticated && user && (
					<>
						<IoIosNotificationsOutline
							size={35}
							className={styles.notification}
						/>
						<div className={styles.addProject}>
							<CiCirclePlus size={35} />
							<span>Создать проект</span>
						</div>

						<span className={styles.name}>{user.name}</span>
						<UserAvatar className={styles.avatar} userName={user.name} />
					</>
				)}
			</div>
		</header>
	)
}
