import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Meetup } from './models/meetups.model';
import { meetupSortTypes } from './constants/sorts';

import type { MeetupQueryValueType } from './constants/sorts';
import type { CreateMeetupDto } from './dto/create-meetup.dto';

@Injectable()
export class MeetupsRepository {
	constructor(@InjectModel(Meetup) private readonly meetupsModel: typeof Meetup) {}

	async getByPrimaryKey(id: number) {
		return await this.meetupsModel.findByPk(id);
	}

	async create(dto: CreateMeetupDto) {
		return await this.meetupsModel.create(dto);
	}

	async getAllByParams(name: string | undefined, take: number = 10, skip: number = 0, sortBy: MeetupQueryValueType) {
		const sortType = meetupSortTypes[sortBy];

		const whereCondition = name ? { name: { [Op.like]: `%${name.toLowerCase()}%` } } : {};

		return await this.meetupsModel.findAll({
			where: whereCondition,
			limit: take,
			offset: skip,
			order: [['name', sortType]],
		});
	}
}
