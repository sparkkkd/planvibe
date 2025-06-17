import { useState, type FC } from 'react'
import clsx from 'clsx'

import Avatar from '../../assets/user-avatar.svg?react'

import styles from './UserAvatar.module.sass'
import { UserDropDown } from '../UserDropDown/UserDropDown'

interface UserAvatarProps {
	className?: string
	userName: string
}

export const UserAvatar: FC<UserAvatarProps> = ({ className, userName }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div
			className={clsx(styles.avatar, className)}
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<Avatar />
			<span className={styles.name}>{userName[0].toUpperCase()}</span>
			{isOpen && <UserDropDown setIsOpen={setIsOpen} />}
		</div>
	)
}
