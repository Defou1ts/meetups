import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserParam } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/models/users.model';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRoles } from 'src/users/constants/user-roles';
import { RequiredRole } from 'src/users/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/users/guards/roles-guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { jwtSwaggerAuthApiHeader } from 'src/auth/constants/jwt-swagger-auth-header';

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
	@ApiHeader(jwtSwaggerAuthApiHeader)
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
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Get(':id')
	async getById(@Param('id', new ParseIntPipe()) id: number) {
		return await this.meetupsService.getMeetupById(id);
	}

	@ApiOperation({ summary: 'Create meetup' })
	@ApiResponse({ status: 201, type: Meetup })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	async create(@Body() dto: CreateMeetupDto) {
		return await this.meetupsService.createMeetup(dto);
	}

	@ApiOperation({ summary: 'Update meetup by id' })
	@ApiResponse({ status: 200, type: Meetup })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch(':id')
	async updateById(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateMeetupDto) {
		return await this.meetupsService.updateMeetupById(id, dto);
	}

	@ApiOperation({ summary: 'Delete meetup by id' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Delete(':id')
	async deleteById(@Param('id', new ParseIntPipe()) id: number) {
		await this.meetupsService.deleteMeetupById(id);
	}

	@ApiOperation({ summary: 'Add tag to meetup' })
	@ApiResponse({ status: 200, type: Meetup })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('addTag')
	async addTag(@Body() dto: AddTagDto) {
		return await this.meetupsService.addTag(dto);
	}

	@ApiOperation({ summary: 'Sign user to meetup' })
	@ApiResponse({ status: 200, type: Meetup })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('sign')
	async sign(@UserParam() user: User, @Body() dto: SignUserToMeetupDto) {
		return await this.meetupsService.signUserToMeetup(dto, user);
	}
}
