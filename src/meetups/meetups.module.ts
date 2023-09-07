import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meetup } from './models/meetups.model';
import { Tag } from 'src/tags/models/tags.model';
import { MeetupTags } from 'src/tags/models/meetup-tags';
import { User } from 'src/users/users.model';
import { UserMeetups } from 'src/users/user-meetups.model';
import { TagsModule } from 'src/tags/tags.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	providers: [MeetupsService],
	controllers: [MeetupsController],
	imports: [SequelizeModule.forFeature([Meetup, Tag, MeetupTags, User, UserMeetups]), TagsModule, JwtModule],
})
export class MeetupsModule {}
