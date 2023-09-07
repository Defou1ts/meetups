import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { UserRoles } from 'src/users/constants/user-roles';
import { Role } from './models/roles.model';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerAuthApiHeader } from 'src/auth/constants/swagger-auth-header';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
	constructor(private roleSerive: RolesService) {}

	@ApiOperation({ summary: 'Create user role' })
	@ApiResponse({ status: 201, type: Role })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.roleSerive.createRole(dto);
	}

	@ApiOperation({ summary: 'Get role by value' })
	@ApiResponse({ status: 200, type: Role })
	@Get('/:value')
	getByValue(@Param('value') value: string) {
		return this.roleSerive.getRoleByValue(value);
	}
}
