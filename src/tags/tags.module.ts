import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meetup } from 'src/meetups/models/meetups.model';
import { Tag } from './models/tags.model';
import { MeetupTags } from './models/meetup-tags';
import { JwtModule } from '@nestjs/jwt';

@Module({
	providers: [TagsService],
	controllers: [TagsController],
	imports: [SequelizeModule.forFeature([Meetup, Tag, MeetupTags]), JwtModule],
	exports: [TagsService],
})
export class TagsModule {}
