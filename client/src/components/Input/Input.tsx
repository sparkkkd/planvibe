import type { FC } from 'react'
import clsx from 'clsx'

import styles from './Input.module.sass'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	type?: string
	wrapperClassName?: string
}

export const Input: FC<InputProps> = ({
	className,
	label,
	type = 'text',
	wrapperClassName,
	...rest
}) => {
	if (label) {
		return (
			<div className={clsx(styles.wrapper, wrapperClassName)}>
				<div className={styles.label}>{label}</div>
				<input type={type} {...rest} />
			</div>
		)
	}

	return <input className={clsx(styles.input, className)} {...rest} />
}
