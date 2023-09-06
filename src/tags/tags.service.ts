import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tags.model';

@Injectable()
export class TagsService {
	constructor(@InjectModel(Tag) private tagsRepository: typeof Tag) {}

	async getAllTags() {
		return await this.tagsRepository.findAll({ include: { all: true, through: { attributes: [] } } });
	}

	async createTag(dto: CreateTagDto) {
		return await this.tagsRepository.create(dto);
	}

	async getTagById(id: number) {
		return await this.tagsRepository.findByPk(id);
	}
}
