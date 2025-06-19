import type { FC } from 'react'
import clsx from 'clsx'

import { LinkTo } from '../../components/Link/Link'
import { useAppSelector } from '../../store/hooks'

import { Container } from '../../components/Container/Container'
import { Header } from '../../modules/Header/Header'

import introImg from '../../assets/intro-img.png'

import styles from './IntroPage.module.sass'

interface IntroPageProps {
	className?: string
}

export const IntroPage: FC<IntroPageProps> = ({ className }) => {
	const { isAuthenticated } = useAppSelector((state) => state.authSlice)

	return (
		<div className={styles.wrapper}>
			<Header />
			<Container>
				<main className={clsx(styles.main, className)}>
					<h1 className={styles.title}>
						Управляй проектами с умом <br />
						<span className={styles.titleDark}>
							Планируй | Выполняй | Улучшай
						</span>
					</h1>
					<LinkTo
						className={styles.link}
						to={isAuthenticated ? '/projects' : '/auth'}
					>
						Попробовать бесплатно
					</LinkTo>
					<h2 className={styles.subtitle}>
						Преврати хаос в порядок — организуй задачи, вдохновляй команду и
						достигай целей быстрее. Planvibe — твой компас в мире продуктивности
					</h2>
					<img src={introImg} alt='Intro image' className={styles.img} />
				</main>
			</Container>
		</div>
	)
}
