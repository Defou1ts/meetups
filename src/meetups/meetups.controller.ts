import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserParam } from 'src/auth/decrorators/user.decorator';
import { User } from 'src/users/models/users.model';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRoles } from 'src/users/constants/user-roles';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerAuthApiHeader } from 'src/auth/constants/swagger-auth-header';

import { MeetupQueryValueType } from './constants/sorts';
import { Meetup } from './models/meetups.model';
import { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { MeetupsService } from './meetups.service';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
	constructor(private readonly meetupsService: MeetupsService) {}

	@ApiOperation({ summary: 'Get all meetups' })
	@ApiResponse({ status: 200, type: [Meetup] })
	@ApiHeader(swaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Get()
	async getAll(
		@Query('name') name: string,
		@Query('take') take: number,
		@Query('skip') skip: number,
		@Query('sort_by') sortBy: MeetupQueryValueType,
	) {
		return await this.meetupsService.getAllMeetups(name, take, skip, sortBy);
	}

	@ApiOperation({ summary: 'Get meetup by id' })
	@ApiResponse({ status: 200, type: Meetup })
	@ApiHeader(swaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.meetupsService.getMeetupById(id);
	}

	@ApiOperation({ summary: 'Create meetup' })
	@ApiResponse({ status: 201, type: Meetup })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	async create(@Body() dto: CreateMeetupDto) {
		return await this.meetupsService.createMeetup(dto);
	}

	@ApiOperation({ summary: 'Update meetup by id' })
	@ApiResponse({ status: 200, type: Meetup })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch(':id')
	async updateById(@Param('id') id: string, @Body() dto: UpdateMeetupDto) {
		return await this.meetupsService.updateMeetupById(id, dto);
	}

	@ApiOperation({ summary: 'Delete meetup by id' })
	@ApiResponse({ status: 200 })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		await this.meetupsService.deleteMeetupById(id);
	}

	@ApiOperation({ summary: 'Add tag to meetup' })
	@ApiResponse({ status: 200, type: Meetup })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('addTag')
	async addTag(@Body() dto: AddTagDto) {
		return await this.meetupsService.addTag(dto);
	}

	@ApiOperation({ summary: 'Sign user to meetup' })
	@ApiResponse({ status: 200, type: Meetup })
	@ApiHeader(swaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('sign')
	async sign(@UserParam() user: User, @Body() dto: SignUserToMeetupDto) {
		return await this.meetupsService.signUserToMeetup(dto, user);
	}
}
