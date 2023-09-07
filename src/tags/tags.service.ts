import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tag } from './models/tags.model';

import type { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
	constructor(@InjectModel(Tag) private readonly tagsRepository: typeof Tag) {}

	async getAllTags() {
		return await this.tagsRepository.findAll();
	}

	async createTag(dto: CreateTagDto) {
		return await this.tagsRepository.create(dto);
	}

	async getTagById(id: number) {
		return await this.tagsRepository.findByPk(id);
	}
}
