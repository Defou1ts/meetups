import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TagsService } from 'src/tags/tags.service';
import { Op } from 'sequelize';

import { Meetup } from './models/meetups.model';
import { meetupSortQueryValues, meetupSortTypes } from './constants/sorts';

import type { CreateMeetupDto } from './dto/create-meetup.dto';
import type { UpdateMeetupDto } from './dto/update-meetup.dto';
import type { AddTagDto } from './dto/add-tag.dto';
import type { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import type { User } from 'src/users/models/users.model';
import type { MeetupQueryValueType } from './constants/sorts';

@Injectable()
export class MeetupsService {
	constructor(
		@InjectModel(Meetup) private readonly meetupsRepository: typeof Meetup,
		private readonly tagsService: TagsService,
	) {}

	async getAllMeetups(
		name: string | undefined,
		take: number = 10,
		skip: number = 0,
		sortBy: MeetupQueryValueType = 'ascending',
	) {
		if (!meetupSortQueryValues.includes(sortBy)) throw new BadRequestException();

		const sortType = meetupSortTypes[sortBy];

		const whereCondition = name ? { name: { [Op.like]: `%${name.toLowerCase()}%` } } : {};

		return await this.meetupsRepository.findAll({
			where: whereCondition,
			limit: take,
			offset: skip,
			order: [['name', sortType]],
		});
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
