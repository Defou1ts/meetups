import { Injectable } from '@nestjs/common';

import { TagsRepository } from './tags.repository';

import type { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
	constructor(private readonly tagsRepository: TagsRepository) {}

	async getAllTags() {
		return await this.tagsRepository.getAll();
	}

	async createTag(dto: CreateTagDto) {
		return await this.tagsRepository.create(dto);
	}

	async getTagById(id: number) {
		return await this.tagsRepository.getByPrimaryKey(id);
	}
}
