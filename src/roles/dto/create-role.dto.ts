import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
	@ApiProperty({ example: 'ORGANIZER', description: 'Unique value of the role' })
	@IsString()
	readonly value: string;

	@ApiProperty({ example: 'Organizer of meetups', description: 'Role description' })
	@IsString()
	readonly description: string;
}
