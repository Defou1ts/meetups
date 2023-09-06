import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meetup } from './meetups.model';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

@Injectable()
export class MeetupsService {
	constructor(@InjectModel(Meetup) private meetupsRepository: typeof Meetup) {}

	async getAllMeetups() {
		return await this.meetupsRepository.findAll({ include: { all: true } });
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
}
