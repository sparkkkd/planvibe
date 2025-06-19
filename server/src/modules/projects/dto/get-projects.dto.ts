import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class GetProjectsDto {
	@ApiProperty({
		description: 'Поиск по названию или описанию',
		required: false,
		example: 'planvibe',
	})
	@IsOptional()
	@IsString()
	search?: string

	@ApiProperty({
		description: 'Сортировка: newest — новые первыми, oldest — старые первыми',
		enum: ['newest', 'oldest'],
		default: 'newest',
		required: false,
	})
	@IsOptional()
	@IsEnum(['newest', 'oldest'])
	sortBy?: 'newest' | 'oldest'
}
