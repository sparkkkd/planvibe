import clsx from 'clsx'
import type { FC } from 'react'

import styles from './Button.module.sass'
import { Loader } from '../Loader/Loader'

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		React.PropsWithChildren {
	isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
	isLoading = false,
	...rest
}) => {
	return (
		<button className={clsx(styles.button, className)} {...rest}>
			{!isLoading && children}
			{isLoading && <Loader className={styles.loader} />}
		</button>
	)
}
