import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Authorization } from '../auth/decorators/authorization.decorator'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiBadRequestResponse({ description: 'Невалидные вводные данные' })
	@ApiOkResponse({ type: 'John Doe', example: 'John Doe' })
	@Patch('update')
	@Authorization()
	@HttpCode(HttpStatus.OK)
	async update(@Body() dto: UpdateUserDto) {
		return this.usersService.updateUser(dto)
	}
}
