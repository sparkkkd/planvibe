export function parseTime(input: string): number {
	const timeRegex = /^(\d+)(ms|s|m|h|d)$/

	const match = input.match(timeRegex)
	if (!match) {
		throw new Error(
			`Неверный формат времени: "${input}". Ожидается формат вроде "7d", "5h", "30m", "10s", "500ms"`
		)
	}

	const value = parseInt(match[1], 10)
	const unit = match[2]

	const unitToMs: Record<string, number> = {
		ms: 1,
		s: 1000,
		m: 60 * 1000,
		h: 60 * 60 * 1000,
		d: 24 * 60 * 60 * 1000,
	}

	return value * unitToMs[unit]
}
