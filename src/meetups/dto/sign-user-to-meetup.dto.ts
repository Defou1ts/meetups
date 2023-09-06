import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SignUserToMeetupDto {
	@ApiProperty({ example: '1', description: 'Meetup id' })
	@IsNumber()
	meetupId: number;
}
