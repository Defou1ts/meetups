import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { UserRoles } from 'src/users/constants/user-roles';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerAuthApiHeader } from 'src/auth/constants/swagger-auth-header';

import { Tag } from './models/tags.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@ApiOperation({ summary: 'Create tag for meetup' })
	@ApiResponse({ status: 201, type: Tag })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	async create(@Body() dto: CreateTagDto) {
		return await this.tagsService.createTag(dto);
	}

	@ApiOperation({ summary: 'Get all meetups tags' })
	@ApiResponse({ status: 200, type: [Tag] })
	@Get()
	async getAll() {
		return await this.tagsService.getAllTags();
	}
}
