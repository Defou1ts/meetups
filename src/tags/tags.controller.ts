import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { UserRoles } from 'src/users/constants/user-roles';
import { Tag } from './models/tags.model';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerAuthApiHeader } from 'src/auth/constants/swagger-auth-header';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
	constructor(private tagsService: TagsService) {}

	@ApiOperation({ summary: 'Create tag for meetup' })
	@ApiResponse({ status: 201, type: Tag })
	@ApiHeader(swaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	create(@Body() dto: CreateTagDto) {
		return this.tagsService.createTag(dto);
	}

	@ApiOperation({ summary: 'Get all meetups tags' })
	@ApiResponse({ status: 200, type: [Tag] })
	@Get()
	getAll() {
		return this.tagsService.getAllTags();
	}
}
