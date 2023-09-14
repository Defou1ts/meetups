import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from './models/roles.model';

import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesRepository {
	constructor(@InjectModel(Role) private readonly rolesModel: typeof Role) {}

	async create(dto: CreateRoleDto) {
		return await this.rolesModel.create(dto);
	}

	async getByValue(value: string) {
		return await this.rolesModel.findOne({ where: { value } });
	}
}
