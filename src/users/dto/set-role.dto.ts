import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetRoleDto {
	@ApiProperty({ example: 'USER', description: 'Value of the role' })
	@IsString()
	readonly value: string;

	@ApiProperty({ example: '1', description: 'Unique ID' })
	@IsString()
	readonly userId: number;
}
