import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { HASH_SALT } from './constants/hash-salt';

import type { JwtPayload } from './strategies/jwt-strategy';
import type { LoginResponseDto } from './dto/login-response.dto';
import type { CreateUserDto } from '../users/dto/create-user-dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login(userDto: CreateUserDto): Promise<LoginResponseDto> {
		const user = await this.validateUser(userDto);

		const { email } = user;

		const accessToken = await this.getAccesToken({ email });
		const refreshToken = await this.getRefreshToken({ email });

		await this.updateRefreshTokenInUser(refreshToken, email);

		return {
			accessToken,
			refreshToken,
		};
	}

	async registration(userDto: CreateUserDto): Promise<LoginResponseDto> {
		const candidate = await this.userService.getUserByEmail(userDto.email);

		if (candidate) {
			throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
		}

		const hashPassword = await bcrypt.hash(userDto.password, HASH_SALT);
		const user = await this.userService.createUser({ ...userDto, password: hashPassword });

		const { email } = user;

		const accessToken = await this.getAccesToken({ email });
		const refreshToken = await this.getRefreshToken({ email });

		const hashedRefreshToken = await bcrypt.hash(refreshToken, HASH_SALT);

		user.set('hashedRefreshToken', hashedRefreshToken);
		await user.save();

		return {
			accessToken,
			refreshToken,
		};
	}

	async getAccesToken(payload: JwtPayload) {
		const accessToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_ACCESS_TOKEN_SECRET,
			expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
		});
		return accessToken;
	}

	async getRefreshToken(payload: JwtPayload) {
		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_TOKEN_SECRET,
			expiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
		});
		return refreshToken;
	}

	async updateRefreshTokenInUser(refreshToken: string, email: string) {
		const hashedRefreshToken = await bcrypt.hash(refreshToken, HASH_SALT);

		await this.userService.updateUserRefreshTokenByEmail(email, hashedRefreshToken);
	}

	async getNewAccessAndRefreshToken(payload: JwtPayload): Promise<LoginResponseDto> {
		const refreshToken = await this.getRefreshToken(payload);
		await this.updateRefreshTokenInUser(refreshToken, payload.email);

		return {
			accessToken: await this.getAccesToken(payload),
			refreshToken,
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
