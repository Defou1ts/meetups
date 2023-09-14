import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const jwtConfigRegister = registerAs('jwt', () => ({
	accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
	accessTokenExpiration: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
	refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
	refreshTokenExpiration: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
}));

export type JwtConfig = ConfigType<typeof jwtConfigRegister>;
