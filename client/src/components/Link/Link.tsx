import type { FC } from 'react'
import clsx from 'clsx'

import styles from './Link.module.sass'
import { Link } from 'react-router-dom'

interface LinkProps extends React.PropsWithChildren {
	className?: string
	to: string
}

export const LinkTo: FC<LinkProps> = ({ className, to, children }) => {
	return (
		<Link to={to} className={clsx(styles.link, className)}>
			{children}
		</Link>
	)
}
