import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'root',
			database: 'meetups',
			models: [],
			autoLoadModels: true,
		}),
		UsersModule,
	],
})
export class AppModule {}
