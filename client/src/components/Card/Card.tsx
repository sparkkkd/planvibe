import type { FC } from 'react'
import clsx from 'clsx'

import styles from './Card.module.sass'

interface CardProps extends React.PropsWithChildren {
	className?: string
}

export const Card: FC<CardProps> = ({ className, children, ...rest }) => {
	return (
		<div className={clsx(styles.card, className)} {...rest}>
			{children}
		</div>
	)
}
