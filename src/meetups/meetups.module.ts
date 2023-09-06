import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meetup } from './meetups.model';
import { Tag } from 'src/tags/tags.model';
import { MeetupTags } from 'src/tags/meetup-tags';

@Module({
	providers: [MeetupsService],
	controllers: [MeetupsController],
	imports: [SequelizeModule.forFeature([Meetup, Tag, MeetupTags])],
})
export class MeetupsModule {}