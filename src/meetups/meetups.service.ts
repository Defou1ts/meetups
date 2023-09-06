import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meetup } from './meetups.model';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class MeetupsService {
	constructor(
		@InjectModel(Meetup) private meetupsRepository: typeof Meetup,
		private tagsService: TagsService,
	) {}

	async getAllMeetups() {
		return await this.meetupsRepository.findAll({ include: { all: true, through: { attributes: [] } } });
	}

	async getMeetupById(id: string) {
		const meetup = await this.meetupsRepository.findOne({ where: { id }, include: { all: true } });

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
	}
}
