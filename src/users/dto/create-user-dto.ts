import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'user@mail.ru', description: 'Email' })
	@IsString()
	@IsEmail()
	readonly email: string;

	@ApiProperty({ example: '123456', description: 'Password' })
	@IsString()
	@Length(4, 16, { message: 'more 4 and less 16' })
	readonly password: string;
}
