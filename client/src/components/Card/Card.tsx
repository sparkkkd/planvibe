import type { FC } from 'react'

import styles from './Card.module.sass'
import clsx from 'clsx'

interface CardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		React.PropsWithChildren {}

export const Card: FC<CardProps> = ({ className, children, ...rest }) => {
	return (
		<div className={clsx(styles.card, className)} {...rest}>
			{children}
		</div>
	)
}
