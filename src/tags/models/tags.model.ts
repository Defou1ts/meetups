import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Meetup } from 'src/meetups/models/meetups.model';
import { User } from 'src/users/users.model';
import { MeetupTags } from './meetup-tags';

interface TagCreationAttrs {
	name: string;
}

@Table({ tableName: 'tag' })
export class Tag extends Model<Tag, TagCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Uniquie ID' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'Node', description: 'Name of tag' })
	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	name: string;

	@BelongsToMany(() => Meetup, () => MeetupTags)
	meetups: User[];
}
