import { Body, Controller, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { RequiredRole } from '../auth/decrorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { SetRoleDto } from './dto/set-role.dto';
import { UserRoles } from './constants/user-roles';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserParam } from 'src/auth/decrorators/user.decorator';

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
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Set role' })
	@ApiResponse({ status: 200 })
	@RequiredRole(UserRoles.USER)
	@Patch('role')
	@UseGuards(JwtAuthenticationGuard)
	setRole(@Body() dto: SetRoleDto) {
		return this.usersService.setRole(dto);
	}
}
