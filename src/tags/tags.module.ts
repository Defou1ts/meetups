import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meetup } from 'src/meetups/meetups.model';
import { Tag } from './tags.model';
import { MeetupTags } from './meetup-tags';

@Module({
	providers: [TagsService],
	controllers: [TagsController],
	imports: [SequelizeModule.forFeature([Meetup, Tag, MeetupTags])],
	exports: [TagsService],
})
export class TagsModule {}
