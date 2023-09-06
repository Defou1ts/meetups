import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meetup } from './models/meetups.model';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { TagsService } from 'src/tags/tags.service';
import { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import { User } from 'src/users/users.model';
import { MeetupQueryValueType, meetupSortQueryValues, meetupSortTypes } from './constants/sorts';

@Injectable()
export class MeetupsService {
	constructor(
		@InjectModel(Meetup) private meetupsRepository: typeof Meetup,
		private tagsService: TagsService,
	) {}

	async getAllMeetups(take: number = 10, skip: number = 0, sortBy: MeetupQueryValueType = 'ascending') {
		if (!meetupSortQueryValues.includes(sortBy)) throw new BadRequestException();
		const sortyType = meetupSortTypes[sortBy];

		return await this.meetupsRepository.findAll({ limit: take, offset: skip, order: [['name', sortyType]] });
	}

	async getMeetupById(id: string) {
		const meetup = await this.meetupsRepository.findOne({ where: { id } });

		if (!meetup) throw new NotFoundException();

		return meetup;
	}

	async createMeetup(dto: CreateMeetupDto) {
		return await this.meetupsRepository.create(dto);
	}

	async updateMeetupById(id: string, dto: UpdateMeetupDto) {
		const meetup = await this.meetupsRepository.findOne({ where: { id } });

		if (!meetup) throw new NotFoundException();

		meetup.set(dto);
		return await meetup.save();
	}

	async deleteMeetupById(id: string) {
		const meetup = await this.meetupsRepository.findOne({ where: { id } });

		if (!meetup) throw new NotFoundException();

		await meetup.destroy();
	}

	async addTag({ meetupId, tagId }: AddTagDto) {
		const meetup = await this.meetupsRepository.findByPk(meetupId);
		const tag = await this.tagsService.getTagById(tagId);

		if (!tag || !meetup) throw new NotFoundException();

		await meetup.$add('tags', tag.id);

		return meetup;
	}

	async signUserToMeetup({ meetupId }: SignUserToMeetupDto, user: User) {
		const meetup = await this.meetupsRepository.findByPk(meetupId);

		if (!meetup) throw new NotFoundException();

		await meetup.$add('users', user.id);

		return meetup;
	}
}
