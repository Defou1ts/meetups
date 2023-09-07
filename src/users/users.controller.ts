import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { swaggerAuthApiHeader } from 'src/auth/constants/swagger-auth-header';

import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { User } from './models/users.model';
import { SetRoleDto } from './dto/set-role.dto';
import { UserRoles } from './constants/user-roles';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201, type: User })
	@ApiHeader(swaggerAuthApiHeader)
	@Post()
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	async create(@Body() userDto: CreateUserDto) {
		return await this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	async getAll() {
		return await this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Set role' })
	@ApiResponse({ status: 200, type: SetRoleDto })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('role')
	async setRole(@Body() dto: SetRoleDto) {
		return await this.usersService.setRole(dto);
	}
}
