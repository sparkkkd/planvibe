import type { FC } from 'react'
import clsx from 'clsx'

import './Loader.sass'

interface LoaderProps {
	className?: string
}

export const Loader: FC<LoaderProps> = ({ className }) => {
	return (
		<div className={clsx(className, 'dot-spinner')}>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
		</div>
	)
}
