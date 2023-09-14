import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TagsService } from 'src/tags/tags.service';

import { meetupSortQueryValues } from './constants/sorts';
import { MeetupsRepository } from './meetups.repository';

import type { CreateMeetupDto } from './dto/create-meetup.dto';
import type { UpdateMeetupDto } from './dto/update-meetup.dto';
import type { AddTagDto } from './dto/add-tag.dto';
import type { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import type { User } from 'src/users/models/users.model';
import type { MeetupQueryValueType } from './constants/sorts';

@Injectable()
export class MeetupsService {
	constructor(
		private readonly meetupsRepository: MeetupsRepository,
		private readonly tagsService: TagsService,
	) {}

	async getAllMeetups(
		name: string | undefined,
		take: number = 10,
		skip: number = 0,
		sortBy: MeetupQueryValueType = 'ascending',
	) {
		if (!meetupSortQueryValues.includes(sortBy)) throw new BadRequestException();

		return await this.meetupsRepository.getAllByParams(name, take, skip, sortBy);
	}

	async getMeetupById(id: number) {
		const meetup = await this.meetupsRepository.getByPrimaryKey(id);

		if (!meetup) throw new NotFoundException();

		return meetup;
	}

	async createMeetup(dto: CreateMeetupDto) {
		return await this.meetupsRepository.create(dto);
	}

	async updateMeetupById(id: number, dto: UpdateMeetupDto) {
		const meetup = await this.meetupsRepository.getByPrimaryKey(id);

		if (!meetup) throw new NotFoundException();

		meetup.set(dto);
		return await meetup.save();
	}

	async deleteMeetupById(id: number) {
		const meetup = await this.meetupsRepository.getByPrimaryKey(id);

		if (!meetup) throw new NotFoundException();

		await meetup.destroy();
	}

	async addTag({ meetupId, tagId }: AddTagDto) {
		const meetup = await this.meetupsRepository.getByPrimaryKey(meetupId);
		const tag = await this.tagsService.getTagById(tagId);

		if (!tag || !meetup) throw new NotFoundException();

		await meetup.$add('tags', tag.id);

		return meetup;
	}

	async signUserToMeetup({ meetupId }: SignUserToMeetupDto, user: User) {
		const meetup = await this.meetupsRepository.getByPrimaryKey(meetupId);

		if (!meetup) throw new NotFoundException();

		await meetup.$add('users', user.id);

		return meetup;
	}
}
