import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import { UserParam } from 'src/auth/decrorators/user.decorator';
import { User } from 'src/users/users.model';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { Meetup } from './models/meetups.model';
import { MeetupQueryValueType } from './constants/sorts';
import { UserRoles } from 'src/users/constants/user-roles';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles-guard';

@Controller('meetups')
export class MeetupsController {
	constructor(private meetupsService: MeetupsService) {}

	@UseGuards(JwtAuthenticationGuard)
	@Get()
	getAll(
		@Query('name') name: string,
		@Query('take') take: number,
		@Query('skip') skip: number,
		@Query('sort_by') sortBy: MeetupQueryValueType,
	) {
		return this.meetupsService.getAllMeetups(name, take, skip, sortBy);
	}

	@UseGuards(JwtAuthenticationGuard)
	@Get(':id')
	getById(@Param('id') id: string) {
		return this.meetupsService.getMeetupById(id);
	}

	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	create(@Body() dto: CreateMeetupDto) {
		return this.meetupsService.createMeetup(dto);
	}

	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Put(':id')
	updateById(@Param('id') id: string, @Body() dto: UpdateMeetupDto) {
		return this.meetupsService.updateMeetupById(id, dto);
	}

	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Delete(':id')
	deleteById(@Param('id') id: string) {
		return this.meetupsService.deleteMeetupById(id);
	}

	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('addTag')
	addTag(@Body() dto: AddTagDto) {
		return this.meetupsService.addTag(dto);
	}

	@UseGuards(JwtAuthenticationGuard)
	@Patch('sign')
	sign(@UserParam() user: User, @Body() dto: SignUserToMeetupDto) {
		return this.meetupsService.signUserToMeetup(dto, user);
	}
}
