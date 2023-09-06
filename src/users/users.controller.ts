import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Give role' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Put('role')
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto);
	}

	@ApiOperation({ summary: 'Ban user' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Put('ban')
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto);
	}
}
