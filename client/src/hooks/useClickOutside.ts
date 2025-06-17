import { useEffect, useRef } from 'react'

type Callback = () => void

export function useClickOutside<T extends HTMLElement>(callback: Callback) {
	const ref = useRef<T>(null)

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) callback()
		}

		document.addEventListener('mousedown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [callback])

	return ref
}
