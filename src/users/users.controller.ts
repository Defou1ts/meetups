import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { SetRoleDto } from './dto/set-role.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 201, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Set role' })
	@ApiResponse({ status: 200 })
	@Patch('role')
	setRole(@Body() dto: SetRoleDto) {
		return this.usersService.setRole(dto);
	}
}
