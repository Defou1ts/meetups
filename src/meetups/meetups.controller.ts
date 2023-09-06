import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

@Controller('meetups')
export class MeetupsController {
	constructor(private meetupsService: MeetupsService) {}

	@Get()
	getAll() {
		return this.meetupsService.getAllMeetups();
	}

	@Get(':id')
	getById(@Param('id') id: string) {
		return this.meetupsService.getMeetupById(id);
	}

	@Post('create')
	create(@Body() dto: CreateMeetupDto) {
		return this.meetupsService.createMeetup(dto);
	}

	@Put(':id')
	updateById(@Param('id') id: string, @Body() dto: UpdateMeetupDto) {
		return this.meetupsService.updateMeetupById(id, dto);
	}

	@Delete(':id')
	deleteById(@Param('id') id: string) {
		return this.meetupsService.deleteMeetupById(id);
	}
}
