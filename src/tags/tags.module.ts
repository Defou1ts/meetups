import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meetup } from 'src/meetups/models/meetups.model';
import { JwtModule } from '@nestjs/jwt';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag } from './models/tags.model';
import { MeetupTags } from './models/meetup-tags';
import { TagsRepository } from './tags.repository';

@Module({
	providers: [TagsService, TagsRepository],
	controllers: [TagsController],
	imports: [SequelizeModule.forFeature([Meetup, Tag, MeetupTags]), JwtModule],
	exports: [TagsService],
})
export class TagsModule {}
