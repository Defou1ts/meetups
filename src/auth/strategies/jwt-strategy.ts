import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConfigRegister, JwtConfig } from 'src/config/jwt.config';

import type { User } from 'src/users/models/users.model';

export interface JwtPayload {
	email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		@Inject(jwtConfigRegister.KEY) private readonly jwtConfig: JwtConfig,
		private readonly userService: UsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.accessTokenSecret,
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { email } = payload;
		const user = await this.userService.getUserByEmail(email);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
