import clsx from 'clsx'
import ReactDOM from 'react-dom'
import type { FC } from 'react'

import { IoIosClose } from 'react-icons/io'

import styles from './Modal.module.sass'

interface ModalProps extends React.PropsWithChildren {
	className?: string
	isOpen: boolean
	onClose: () => void
	title?: string
}

const modalRoot = document.getElementById('modal-root') as HTMLElement

export const Modal: FC<ModalProps> = ({
	className,
	isOpen,
	onClose,
	title,
	children,
}) => {
	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={onClose}>
			<div
				className={clsx(styles.modal, className)}
				onClick={(e) => e.stopPropagation()}
			>
				{title && <h3>{title}</h3>}
				<button className={styles.close} onClick={onClose}>
					<IoIosClose />
					size={20}
				</button>
				<div className={styles.content}>{children}</div>
			</div>
		</div>,
		modalRoot
	)
}
