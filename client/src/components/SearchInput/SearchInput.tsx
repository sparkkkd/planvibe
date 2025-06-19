import type { FC } from 'react'

import styles from './SearchInput.module.sass'
import clsx from 'clsx'

interface SearchInputProps {
	className?: string
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export const SearchInput: FC<SearchInputProps> = ({
	className,
	value,
	onChange,
	placeholder,
}) => {
	return (
		<input
			className={clsx(styles.input, className)}
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	)
}
