import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddTagDto {
	@ApiProperty({ example: '1', description: 'Meetup id' })
	@IsNumber()
	meetupId: number;

	@ApiProperty({ example: '1', description: 'Tag id' })
	@IsNumber()
	tagId: number;
}
