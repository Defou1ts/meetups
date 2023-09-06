import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateMeetupDto {
	@ApiProperty({ example: 'GraphQL', description: 'Meetup name' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'Node js microservices review', description: 'Meetup description' })
	@IsString()
	description: string;

	@ApiProperty({ example: 'Google Meet', description: 'Meetup location' })
	@IsString()
	location: string;

	@ApiProperty({ example: 'Date example', description: 'Meetup Date' })
	@IsDateString()
	date: Date;
}
