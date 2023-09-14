import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RequiredRole } from 'src/users/decorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/users/guards/roles-guard';
import { UserRoles } from 'src/users/constants/user-roles';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { jwtSwaggerAuthApiHeader } from 'src/auth/constants/jwt-swagger-auth-header';

import { Role } from './models/roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
	constructor(private readonly roleSerive: RolesService) {}

	@ApiOperation({ summary: 'Create user role' })
	@ApiResponse({ status: 201, type: Role })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post()
	async create(@Body() dto: CreateRoleDto) {
		return await this.roleSerive.createRole(dto);
	}

	@ApiOperation({ summary: 'Get role by value' })
	@ApiResponse({ status: 200, type: Role })
	@Get('/:value')
	async getByValue(@Param('value') value: string) {
		return await this.roleSerive.getRoleByValue(value);
	}
}
