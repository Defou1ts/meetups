import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface RoleCreationAttrs {
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Uniquie ID' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'ORGANIZER', description: 'Value of users role' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string;

	@ApiProperty({ example: 'Администратор', description: 'Role description' })
	@Column({ type: DataType.STRING, allowNull: false })
	description: string;

	@HasMany(() => User)
	users: User[];
}
