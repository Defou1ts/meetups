import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';

import { UserRoles } from './constants/user-roles';
import { UNKNOWN_USER_EXCEPTION, UNKNOWN_USER_ROLE_EXCEPTION } from './constants/user-exceptions';
import { UsersRepository } from './users.repository';

import type { CreateUserDto } from './dto/create-user-dto';
import type { SetRoleDto } from './dto/set-role.dto';

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly roleService: RolesService,
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.usersRepository.create(dto);
		const role = await this.roleService.getRoleByValue(UserRoles.USER);

		if (role) {
			await user.$set('role', role.id);
			user.role = role;
		}

		return user;
	}

	async getAllUsers() {
		return await this.usersRepository.getAll();
	}

	async getUserByEmail(email: string) {
		return await this.usersRepository.getByEmail(email);
	}

	async updateUserRefreshTokenByEmail(email: string, hashedRefreshToken: string) {
		const user = await this.usersRepository.getByEmail(email);

		if (!user) {
			throw new HttpException(UNKNOWN_USER_EXCEPTION, HttpStatus.NOT_FOUND);
		}

		user.set('hashedRefreshToken', hashedRefreshToken);
		await user.save();
	}

	async setRole(dto: SetRoleDto) {
		const user = await this.usersRepository.getByPrimaryKey(dto.userId);
		const role = await this.roleService.getRoleByValue(dto.value);

		if (!role) {
			throw new HttpException(UNKNOWN_USER_ROLE_EXCEPTION, HttpStatus.NOT_FOUND);
		}

		if (!user) {
			throw new HttpException(UNKNOWN_USER_EXCEPTION, HttpStatus.NOT_FOUND);
		}

		await user.$set('role', role.id);
		return dto;
	}
}
