import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/models/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Meetup } from 'src/meetups/models/meetups.model';

import { User } from './models/users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserMeetups } from './models/user-meetups.model';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([User, Role, Meetup, UserMeetups]), RolesModule, forwardRef(() => AuthModule)],
	exports: [UsersService],
})
export class UsersModule {}
