import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { AuthModule } from './auth/auth.module';
import { MeetupsModule } from './meetups/meetups.module';
import { TagsModule } from './tags/tags.module';
import { Meetup } from './meetups/meetups.model';
import { Tag } from './tags/tags.model';
import { MeetupTags } from './tags/meetup-tags';
import { UserMeetups } from './users/user-meetups.model';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRESS_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [User, Role, Meetup, Tag, MeetupTags, UserMeetups],
			autoLoadModels: true,
		}),
		UsersModule,
		RolesModule,
		AuthModule,
		MeetupsModule,
		TagsModule,
	],
})
export class AppModule {}
