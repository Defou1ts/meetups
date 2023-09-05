import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
	constructor(private roleSerive: RolesService) {}

	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.roleSerive.createRole(dto);
	}

	@Get('/:value')
	getById(@Param('value') value: string) {
		return this.roleSerive.getRoleByValue(value);
	}
}
