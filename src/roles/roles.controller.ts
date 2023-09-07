import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { UserRoles } from 'src/users/constants/user-roles';

@Controller('roles')
export class RolesController {
	constructor(private roleSerive: RolesService) {}

	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.roleSerive.createRole(dto);
	}

	@Get('/:value')
	getById(@Param('value') value: string) {
		return this.roleSerive.getRoleByValue(value);
	}
}
