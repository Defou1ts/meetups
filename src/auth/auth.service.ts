import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto);
		return this.genereateToken(user);
	}

	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email);

		if (candidate) {
			throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.createUser({ ...userDto, password: hashPassword });
		return this.genereateToken(user);
	}

	async genereateToken({ email, id, roles }: User) {
		const payload = { email, id, roles };
		return {
			token: this.jwtService.sign(payload),
		};
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email);

		if (!user) {
			throw new NotFoundException();
		}

		const passwordEquals = await bcrypt.compare(userDto.password, user.password);

		if (user && passwordEquals) {
			return user;
		}

		throw new UnauthorizedException({ message: 'Incorrect email or password' });
	}
}
