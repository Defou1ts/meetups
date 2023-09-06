import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { RolesService } from 'src/roles/roles.service';
import { SetRoleDto } from './dto/set-role.dto';
import { UserRoles } from './constants/user-roles';
import { Role } from 'src/roles/models/roles.model';
import { Meetup } from 'src/meetups/models/meetups.model';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private usersRepository: typeof User,
		private roleService: RolesService,
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.usersRepository.create(dto);
		const role = await this.roleService.getRoleByValue(UserRoles.USER);

		await user.$set('role', role.id);
		user.role = role;

		return user;
	}

	async getAllUsers() {
		const users = await this.usersRepository.findAll({
			include: [
				{ model: Role, attributes: ['value', 'id'] },
				{ model: Meetup, attributes: ['name', 'description', 'id'], through: { attributes: [] } },
			],
			attributes: { exclude: ['roleId'] },
		});
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.usersRepository.findOne({
			where: { email },
			include: { all: true },
		});
		return user;
	}

	async updateUserRefreshTokenByEmail(email: string, hashedRefreshToken: string) {
		const user = await this.usersRepository.findOne({ where: { email } });
		user.set('hashedRefreshToken', hashedRefreshToken);
		user.save();
	}

	async setRole(dto: SetRoleDto) {
		const user = await this.usersRepository.findByPk(dto.userId);
		const role = await this.roleService.getRoleByValue(dto.value);

		if (role && user) {
			await user.$set('role', role.id);
			return dto;
		}

		throw new HttpException('Unknown user or role', HttpStatus.NOT_FOUND);
	}
}
