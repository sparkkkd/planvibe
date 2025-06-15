import { ApiProperty } from '@nestjs/swagger'

export class AuthResponseDto {
	@ApiProperty({
		description: 'Токен доступа',
		example:
			'eyJhbGI1NiIsInrasI6IkpXVCJ9.eyJpZCI6IjE0MzhizOSIsImlhdCI6MTc0OTkzODY0MCwiZXhwIjoxNzQ5OTQ1ODQwfQ.QdGSLIVTdY0aprgADnYNI',
	})
	access_token: string
}
