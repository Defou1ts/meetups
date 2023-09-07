import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { RequiredRole } from 'src/auth/decrorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { UserRoles } from 'src/users/constants/user-roles';

@Controller('tags')
export class TagsController {
	constructor(private tagsService: TagsService) {}

	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	create(@Body() dto: CreateTagDto) {
		return this.tagsService.createTag(dto);
	}

	@Get()
	getAll() {
		return this.tagsService.getAllTags();
	}
}
