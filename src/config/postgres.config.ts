import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const postgresConfigRegister = registerAs('postgres', () => ({
	host: process.env.POSTGRES_HOST || 'postgres',
	port: Number(process.env.POSTGRES_PORT) || 5432,
	username: process.env.POSTGRES_USER || 'postgres',
	password: process.env.POSTGRES_PASSWORD || 'root',
	database: process.env.POSTGRES_DATABASE || 'meetups',
}));

export type PostgresConfig = ConfigType<typeof postgresConfigRegister>;
