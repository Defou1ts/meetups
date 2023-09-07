import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
	@ApiProperty({ example: 'Node Js', description: 'Tag name' })
	@IsString()
	name: string;
}
