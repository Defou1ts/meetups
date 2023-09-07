import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { RolesService } from 'src/roles/roles.service';
import { SetRoleDto } from './dto/set-role.dto';
import { UserRoles } from './constants/user-roles';
import { Role } from 'src/roles/models/roles.model';
import { Meetup } from 'src/meetups/models/meetups.model';
import { UNKNOWN_USER_EXCEPTION, UNKNOWN_USER_ROLE_EXCEPTION } from './constants/user-exceptions';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private usersRepository: typeof User,
		private roleService: RolesService,
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
		return await this.usersRepository.findAll({
			attributes: { exclude: ['roleId'] },
			include: { model: Role },
		});
	}

	async getUserByEmail(email: string) {
		return await this.usersRepository.findOne({
			where: { email },
			include: { model: Role },
		});
	}

	async updateUserRefreshTokenByEmail(email: string, hashedRefreshToken: string) {
		const user = await this.usersRepository.findOne({ where: { email } });
		user.set('hashedRefreshToken', hashedRefreshToken);
		user.save();
	}

	async setRole(dto: SetRoleDto) {
		const user = await this.usersRepository.findByPk(dto.userId);
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
