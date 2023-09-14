import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { MeetupsModule } from './meetups/meetups.module';
import { TagsModule } from './tags/tags.module';
import { postgresConfigRegister } from './config/postgres.config';
import { Meetup } from './meetups/models/meetups.model';
import { Role } from './roles/models/roles.model';
import { MeetupTags } from './tags/models/meetup-tags';
import { Tag } from './tags/models/tags.model';
import { UserMeetups } from './users/models/user-meetups.model';
import { User } from './users/models/users.model';
import { jwtConfigRegister } from './config/jwt.config';
import { encryptionConfigRegister } from './config/encryption.config';
import { appConfigRegister } from './config/app.config copy';

import type { PostgresConfig } from './config/postgres.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.${process.env.NODE_ENV}.env`,
			load: [postgresConfigRegister, jwtConfigRegister, encryptionConfigRegister, appConfigRegister],
		}),
		SequelizeModule.forRootAsync({
			inject: [postgresConfigRegister.KEY],
			useFactory: ({ host, port, username, password, database }: PostgresConfig) => ({
				dialect: 'postgres',
				host,
				port,
				username,
				password,
				database,
				models: [User, Role, Meetup, Tag, MeetupTags, UserMeetups],
				autoLoadModels: true,
			}),
		}),
		UsersModule,
		RolesModule,
		JwtAuthModule,
		MeetupsModule,
		TagsModule,
	],
})
export class AppModule {}
