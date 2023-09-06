import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'user@mail.ru', description: 'Email' })
	@IsString({ message: 'Must be string' })
	@IsEmail({}, { message: 'Must be email' })
	readonly email: string;

	@ApiProperty({ example: '123456', description: 'Password' })
	@IsString({ message: 'Must be string' })
	@Length(4, 16, { message: 'more 4 and less 16' })
	readonly password: string;
}
