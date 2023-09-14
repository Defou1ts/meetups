import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { jwtConfigRegister, JwtConfig } from 'src/config/jwt.config';
import { EncryptionConfig, encryptionConfigRegister } from 'src/config/encryption.config';

import type { JwtPayload } from './strategies/jwt-strategy';
import type { JwtLoginResponseDto } from './dto/jwt-login-response.dto';
import type { CreateUserDto } from '../users/dto/create-user-dto';

@Injectable()
export class JwtAuthService {
	constructor(
		@Inject(encryptionConfigRegister.KEY) private readonly encryptionConfig: EncryptionConfig,
		@Inject(jwtConfigRegister.KEY) private readonly jwtConfig: JwtConfig,
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login(userDto: CreateUserDto): Promise<JwtLoginResponseDto> {
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

	async registration(userDto: CreateUserDto): Promise<JwtLoginResponseDto> {
		const candidate = await this.userService.getUserByEmail(userDto.email);

		if (candidate) {
			throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
		}

		const hashPassword = await bcrypt.hash(userDto.password, this.encryptionConfig.salt);
		const user = await this.userService.createUser({ ...userDto, password: hashPassword });

		const { email } = user;

		const accessToken = await this.getAccesToken({ email });
		const refreshToken = await this.getRefreshToken({ email });

		const hashedRefreshToken = await bcrypt.hash(refreshToken, this.encryptionConfig.salt);

		user.set('hashedRefreshToken', hashedRefreshToken);
		await user.save();

		return {
			accessToken,
			refreshToken,
		};
	}

	async getAccesToken(payload: JwtPayload) {
		const accessToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.accessTokenSecret,
			expiresIn: this.jwtConfig.accessTokenExpiration,
		});
		return accessToken;
	}

	async getRefreshToken(payload: JwtPayload) {
		const refreshToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.refreshTokenSecret,
			expiresIn: this.jwtConfig.refreshTokenExpiration,
		});
		return refreshToken;
	}

	async updateRefreshTokenInUser(refreshToken: string, email: string) {
		const hashedRefreshToken = await bcrypt.hash(refreshToken, this.encryptionConfig.salt);

		await this.userService.updateUserRefreshTokenByEmail(email, hashedRefreshToken);
	}

	async getNewAccessAndRefreshToken(payload: JwtPayload): Promise<JwtLoginResponseDto> {
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
