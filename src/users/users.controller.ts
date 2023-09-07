import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/users.model';
import { SetRoleDto } from './dto/set-role.dto';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { UserRoles } from './constants/user-roles';
import { swaggerAuthApiHeader } from 'src/auth/constants/swagger-auth-header';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201, type: User })
	@ApiHeader(swaggerAuthApiHeader)
	@Post()
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Set role' })
	@ApiResponse({ status: 200, type: SetRoleDto })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('role')
	setRole(@Body() dto: SetRoleDto) {
		return this.usersService.setRole(dto);
	}
}
