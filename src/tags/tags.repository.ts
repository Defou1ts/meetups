import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tag } from './models/tags.model';

import type { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsRepository {
	constructor(@InjectModel(Tag) private readonly tagsModel: typeof Tag) {}

	async getAll() {
		return await this.tagsModel.findAll();
	}

	async create(dto: CreateTagDto) {
		return await this.tagsModel.create(dto);
	}

	async getByPrimaryKey(id: number) {
		return await this.tagsModel.findByPk(id);
	}
}
