import { Body, Controller, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Role } from '../auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { SetRoleDto } from './dto/set-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserRoles } from './constants/user-roles';

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
	@Role(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Set role' })
	@ApiResponse({ status: 200 })
	@Role(UserRoles.USER)
	@UseGuards(RolesGuard)
	@Patch('role')
	setRole(@Body() dto: SetRoleDto) {
		return this.usersService.setRole(dto);
	}
}
