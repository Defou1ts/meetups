import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { MeetupTags } from 'src/tags/models/meetup-tags';
import { Tag } from 'src/tags/models/tags.model';
import { UserMeetups } from 'src/users/models/user-meetups.model';
import { User } from 'src/users/models/users.model';

interface MeetupCreationAttrs {
	name: string;
	description: string;
	location: string;
	date: Date;
}

@Table({ tableName: 'meetups' })
export class Meetup extends Model<Meetup, MeetupCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Uniquie ID' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'Nest JS', description: 'Name of meetup' })
	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	name: string;

	@ApiProperty({ example: 'Creating microservices in node.js', description: 'Description of meetup' })
	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	description: string;

	@ApiProperty({ example: 'Google Meet', description: 'Location of meetup' })
	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	location: string;

	@ApiProperty({ example: 'Google Meet', description: 'Location of meetup' })
	@Column({ type: DataType.DATE, unique: false, allowNull: false })
	date: Date;

	@BelongsToMany(() => Tag, () => MeetupTags)
	tags: Tag[];

	@BelongsToMany(() => User, () => UserMeetups)
	users: User[];
}
