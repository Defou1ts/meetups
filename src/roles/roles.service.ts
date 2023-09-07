import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from './models/roles.model';

import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private readonly rolesRepository: typeof Role) {}

	async createRole(dto: CreateRoleDto) {
		const role = await this.rolesRepository.create(dto);
		return role;
	}

	async getRoleByValue(value: string) {
		const role = await this.rolesRepository.findOne({ where: { value } });
		return role;
	}
}
