import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt-strategy';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(private userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
			secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
		});
	}

	async validate(payload: JwtPayload) {
		const { email } = payload;
		const user = await this.userService.getUserByEmail(email);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
