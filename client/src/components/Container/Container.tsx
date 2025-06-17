import clsx from 'clsx'
import type { FC } from 'react'

import styles from './Container.module.sass'

interface ContainerProps extends React.PropsWithChildren {
	className?: string
}

export const Container: FC<ContainerProps> = ({ className, children }) => {
	return <div className={clsx(styles.container, className)}>{children}</div>
}
