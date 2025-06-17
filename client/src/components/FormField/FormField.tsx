import clsx from 'clsx'

import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { Input } from '../Input/Input'

import styles from './FormField.module.sass'

interface FormFieldProps<T extends FieldValues> {
	className?: string
	inputClassName?: string
	name: Path<T>
	type?: string
	placeholder: string
	error?: string
	register: UseFormRegister<T>
}

export const FormField = <T extends FieldValues>({
	className,
	name,
	placeholder,
	register,
	error,
	type = 'text',
	inputClassName,
}: FormFieldProps<T>) => {
	return (
		<div className={clsx(styles.wrapper, className)}>
			<Input
				placeholder={placeholder}
				type={type}
				{...register(name)}
				className={clsx(
					error ? styles.error : '',
					styles.input,
					inputClassName
				)}
			/>
			{error && <span className={styles.errorMessage}>{error}</span>}
		</div>
	)
}
