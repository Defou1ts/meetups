import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from 'src/tags/models/tags.model';
import { MeetupTags } from 'src/tags/models/meetup-tags';
import { User } from 'src/users/models/users.model';
import { UserMeetups } from 'src/users/models/user-meetups.model';
import { TagsModule } from 'src/tags/tags.module';
import { JwtModule } from '@nestjs/jwt';

import { Meetup } from './models/meetups.model';
import { MeetupsController } from './meetups.controller';
import { MeetupsService } from './meetups.service';
import { MeetupsRepository } from './meetups.repository';

@Module({
	providers: [MeetupsService, MeetupsRepository],
	controllers: [MeetupsController],
	imports: [SequelizeModule.forFeature([Meetup, Tag, MeetupTags, User, UserMeetups]), TagsModule, JwtModule],
})
export class MeetupsModule {}
