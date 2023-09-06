import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
	constructor(private tagsService: TagsService) {}

	@Post('create')
	create(@Body() dto: CreateTagDto) {
		return this.tagsService.createTag(dto);
	}

	@Get()
	getAll() {
		return this.tagsService.getAllTags();
	}
}
