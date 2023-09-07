import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Meetup } from 'src/meetups/models/meetups.model';

import { Tag } from './tags.model';

@Table({ tableName: 'meetup_tags', createdAt: false, updatedAt: false })
export class MeetupTags extends Model<MeetupTags> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ForeignKey(() => Meetup)
	@Column({ type: DataType.INTEGER })
	meetupId: number;

	@ForeignKey(() => Tag)
	@Column({ type: DataType.INTEGER })
	tagId: number;
}
