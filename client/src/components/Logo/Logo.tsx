import type { FC } from 'react'
import clsx from 'clsx'

import { FaPaperPlane } from 'react-icons/fa'

import styles from './Logo.module.sass'

interface LogoProps {
	className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
	return (
		<div className={clsx(styles.logo, className)}>
			<div>
				<FaPaperPlane size={30} />
			</div>
			<div className={styles.text}>PLANVIBE\</div>
		</div>
	)
}
