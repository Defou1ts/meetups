import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/models/users.model';

import { UsersService } from 'src/users/users.service';

export interface JwtPayload {
	email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
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
