import { Injectable, NotFoundException } from '@nestjs/common';

import { RolesRepository } from './roles.repository';

import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
	constructor(private readonly rolesRepository: RolesRepository) {}

	async createRole(dto: CreateRoleDto) {
		const role = await this.rolesRepository.create(dto);
		return role;
	}

	async getRoleByValue(value: string) {
		const role = await this.rolesRepository.getByValue(value);

		if (!role) throw new NotFoundException();

		return role;
	}
}
