import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/models/roles.model';

import { User } from './models/users.model';

import type { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersRepository {
	constructor(@InjectModel(User) private readonly userModel: typeof User) {}

	async create(dto: CreateUserDto) {
		return await this.userModel.create(dto);
	}

	async getAll() {
		return await this.userModel.findAll({
			attributes: { exclude: ['roleId'] },
			include: { model: Role },
		});
	}

	async getByEmail(email: string) {
		return await this.userModel.findOne({
			where: { email },
			include: { model: Role },
		});
	}

	async getByPrimaryKey(id: number) {
		return await this.userModel.findByPk(id);
	}
}
