import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Meetup } from 'src/meetups/meetups.model';
import { Role } from 'src/roles/roles.model';
import { UserMeetups } from './user-meetups.model';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Uniquie ID' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'user@mail.ru', description: 'Email' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({ example: '1234', description: 'Password' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@ApiProperty({ example: '1234', description: 'Hashed Refresh Token' })
	@Column({ type: DataType.STRING })
	hashedRefreshToken: string;

	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleId: number;

	@BelongsTo(() => Role)
	role: Role;

	@BelongsToMany(() => Meetup, () => UserMeetups)
	meetups: Meetup[];
}
