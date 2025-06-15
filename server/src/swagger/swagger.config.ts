import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
	return new DocumentBuilder()
		.setTitle('Planvibe API doc')
		.setDescription('Документация по API Planvibe')
		.setContact('Джалал Акаев', 'https://t.me/sparkkkd', 'sparereddd@gmail.com')
		.setLicense('Git repo', 'https://github.com/sparkkkd/planvibe/')
		.setVersion('1.0')
		.addBearerAuth()
		.build()
}
