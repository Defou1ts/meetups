import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/models/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Meetup } from 'src/meetups/models/meetups.model';
import { UserMeetups } from './user-meetups.model';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([User, Role, Meetup, UserMeetups]), RolesModule, forwardRef(() => AuthModule)],
	exports: [UsersService],
})
export class UsersModule {}
